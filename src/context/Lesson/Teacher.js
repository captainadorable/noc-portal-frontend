import React, { createContext, useState, useRef, useEffect } from 'react';
import { io } from 'socket.io-client';

const TeacherContext = createContext();

const servers = {
    iceServers: [
        {
            urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
        },
    ],
    iceCandidatePoolSize: 10,
};

const pc = new RTCPeerConnection(servers);
const dc = pc.createDataChannel('chat'); // Data channel for chat

const socket = io(`${process.env.REACT_APP_SERVER_IP}`);

const ContextProviderTeacher = ({ children, session }) => {
    const [call, setCall] = useState({});
    const [lesson, setLesson] = useState("");
    const [remoteUserSession, setRemoteUserSession] = useState({});

    const [joinRequests, setJoinRequest] = useState([]); // For teacher
    const [connected, setConnected] = useState(false); 

    const [elapsedTime, setElapsedTime] = useState(0);

    const [mic, setMic] = useState(true);
    const [cam, setCam] = useState(true);
    const [screen, setScreen] = useState(false);

    const [myStream, setMyStream] = useState();
    const [myScreenStream, setMyScreenStream] = useState();
    const [userStream, setUserStream] = useState();

    const myVideoRef = useRef();
    const remoteVideoRef = useRef();

    const [messages, setMessages] = useState([]);

    // Set local stream and remote stream. Wait for peer connection ontrack event.
    const runThat = async () => {
        let localStream = await navigator.mediaDevices
            .getUserMedia({ video: { facingMode: "environment" }, audio: true })
            .then((stream) => (myVideoRef.current.srcObject = stream));
        let remoteStream = new MediaStream();

        setMyStream(localStream);
        setUserStream(remoteStream);

        localStream.getTracks().forEach((track) => {
            pc.addTrack(track, localStream);
        });

        pc.ontrack = (event) => {
            event.streams[0].getTracks().forEach((track) => {
                remoteStream.addTrack(track);
            });
            console.log(remoteStream);
        };

        pc.ondatachannel = handleChannelCallback; // When chat channel open
    };

    // CHAT
    var handleDataChannelOpen = function (event) {
        console.log('dataChannel.OnOpen', event);
    };
    var handleDataChannelMessageReceived = function (event) {
        console.log('dataChannel.OnMessage:', event);
        const data = JSON.parse(event.data);

        if (data.screenShare) {
            setScreen(data.screenShare);
            return
        }
        else if (data.screenShare == false) {
            setScreen(data.screenShare);
            return
        }
        else {
            setMessages((ex) => [...ex, { message: data.message, sender: data.sender }]);
        }
    };
    var handleChannelCallback = function (event) {
        let datachan = event.channel;
        datachan.onopen = handleDataChannelOpen;
        datachan.onmessage = handleDataChannelMessageReceived;
    };
    // CHAT

    // Start once
    useEffect(() => {
        runThat();
    }, []);

    // When a call activated add a listener for sudden exit from site.
    useEffect(() => {
        if (call.active) {
            window.addEventListener('beforeunload', () => leaveCallWithoutButton(call.id));
        }
    }, [call]);

    useEffect(() => {
        console.log(messages);
        console.log(myScreenStream)
    }, [messages]);

    useEffect(() => {
        console.log(userStream);
    }, [userStream])
    const sendMessage = (message) => {
        let msg = {
            message: message,
            sender: session,
        };
        setMessages((ex) => [...ex, msg]);
        dc.send(JSON.stringify(msg));
    };

    // Refresh video sources. When a call activated refresh video sources.
    const refreshVideos = () => {
        myVideoRef.current.srcObject = myStream;
        remoteVideoRef.current.srcObject = userStream;
    };

    // Create call with random id.
    const createCall = async (lesson) => {
        setLesson(lesson);
    
        console.log('createcall');

        setCall({ id: socket.id, active: true });

        // Listen for my candidates and add them to firestore
        pc.onicecandidate = (event) => {
            event.candidate && socket.emit("offerCandidates", { candidates: event.candidate.toJSON() })
        };

        // Listen for connection state change. On disconnected leaveCall. On connected getRemoteUserSession.
        pc.onconnectionstatechange = (event) => {
            if (event.target.connectionState === 'disconnected') {
                console.log('DISCONNECTED');
                setConnected(false)
                leaveCall();
            }
            if (event.target.connectionState === 'connected') {
                console.log('CONNECTED');
                setConnected(true);
                getRemoteUserSession();
                
                socket.on("elapsedTime", time => {
                    setElapsedTime(time);
                })
            }
        };

        // Create an offer desc and set it peerconnection

        const offerDescription = await pc.createOffer();
        await pc.setLocalDescription(offerDescription);

        const offer = {
            sdp: offerDescription.sdp,
            type: offerDescription.type,
        };

        socket.emit('offerDescription', { offer, userData: session, lesson });

        socket.on("joinRequests", (reqs) => [
            setJoinRequest(ex => reqs)
        ]);


        socket.on('remoteDescription', (answer) => {
            console.log("BI-Remote-Desc", answer)
            if (!pc.currentRemoteDescription) {
                console.log("AI-Remote-Desc", answer)
                const answerDescription = new RTCSessionDescription(answer);
                pc.setRemoteDescription(answerDescription);
            }
        });

        socket.on("answerCandidates", (candidates) => {
            console.log("Answer-Cand", candidates)
            const candidate = new RTCIceCandidate(candidates);  
            pc.addIceCandidate(candidate);
        })

        socket.on("remoteDisconnected", () => {
            window.location.reload()
        });
    };

    // Answer call with callid
    const answerCall = async (callId) => {
        console.log('answercall');

        socket.emit("validateRoom", callId)
        socket.on("validateRoom", state => {
            if (state) {
                setCall({ id: callId, active: true });
        

                pc.onicecandidate = (event) => {
                    event.candidate && socket.emit("answerCandidates", { candidates: event.candidate.toJSON() })
                };
        
                pc.onconnectionstatechange = (event) => {
                    if (event.target.connectionState === 'disconnected') {
                        console.log('DISCONNECTED');
                        setConnected(false)
                        leaveCall();
                    }
                    if (event.target.connectionState === 'connected') {
                        console.log('CONNECTED');
                        setConnected(true)
                        socket.on("elapsedTime", time => {
                            setElapsedTime(time);
                        });
                        getRemoteUserSession();
                    }
                };
        
                // Get calldata
                socket.emit("getOfferDesc", (callId));
                socket.on("getOfferDesc", async (offerDesc, lesson) => {
                    console.log("Get-Offer-Desc", offerDesc, lesson)
        
                    setLesson(lesson);

                    console.log(offerDesc)
                    console.log(lesson)


                    // Get remote descripton and set it to peerconnection
                    const offerDescription = offerDesc;
                    await pc.setRemoteDescription(new RTCSessionDescription(offerDescription));
                    
                    // Create answer desc
                    const answerDescription = await pc.createAnswer();
                    await pc.setLocalDescription(answerDescription);
                    
                    const answerDesc = {
                        type: answerDescription.type,
                        sdp: answerDescription.sdp,
                    };
            
                    socket.emit('answerDescription', { answerDesc, userData: session, callId});
                    socket.on("roomNotFound", () => {
                        console.log("Room not found")
                        window.location.replace("/lesson")
                        return;
                    })
                    socket.on("getOfferCandidates", candidates => { // Get candidates for first connection
                        console.log("Get-Offer-Cand", candidates)
                        candidates.forEach(candidate => {
                            pc.addIceCandidate(new RTCIceCandidate(candidate));
                        })
                    })
                });
                
                
                socket.on("offerCandidates", candidates => {
                    console.log("Offer-Cand", candidates)
                    pc.addIceCandidate(new RTCIceCandidate(candidates));
                })
            
                socket.on("remoteDisconnected", () => {
                    // Leave from room
                    window.location.reload()
                });
            }
            else {
                console.log("Room not found")
                window.location.replace("/lesson")
                return;
            }
        })

    };

    // Controls
    const toggleMic = () => {
        const audiotrack = myStream.getTracks().find((track) => track.kind === 'audio');
        audiotrack.enabled = !audiotrack.enabled;
        setMic(audiotrack.enabled);
        console.log(audiotrack.enabled);
    };

    const toggleCam = () => {
        const videotrack = myStream.getTracks().find((track) => track.kind === 'video');
        videotrack.enabled = !videotrack.enabled;
        setCam(videotrack.enabled);
        console.log(videotrack.enabled);
    };

    const createScreenShare = async () => {
        
        const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: { cursor: 'always' }, audio:true, })

        const videotrack = myStream.getTracks().find((track) => track.kind === 'video');
        if (!screen) videotrack.enabled = true; setCam(true)
        
        setScreen(true)
        setMyScreenStream(screenStream)

        const sender = pc.getSenders()[1]
        console.log(sender)
        screenStream.getTracks().forEach(track => {
            if (track.kind == "video") {
                sender.replaceTrack(track)
            }
        })
        myVideoRef.current.srcObject = screenStream;

        screenStream.oninactive = () => {
            stopScreenShare()
        }

        const data = { screenShare: true }
        dc.send(JSON.stringify(data));



    }

    const stopScreenShare = async () => {
        
        const sender = pc.getSenders()[1]

        myScreenStream?.getTracks().forEach(track => track.stop())
        myStream.getTracks().forEach(track => {
            if (track.kind == "video") {
                sender.replaceTrack(track)
            }
        })

        myVideoRef.current.srcObject = myStream;
        setScreen(false);

        const data = { screenShare: false }
        dc.send(JSON.stringify(data));
    }
    // Leave call
    const leaveCall = async () => {
        socket.emit("disconnectFromCall");
        window.location.reload()
    };
    const leaveCallWithoutButton = async () => {
        socket.emit("disconnectFromCall");
    };

    // Get remote user session data from firestore
    const getRemoteUserSession = async () => {
            socket.emit("getRemoteUserSession")
            socket.on("getRemoteUserSession", session => {
                console.log("Get-Remote-Session", session)
                setRemoteUserSession(session);
            })
    };

    const handleRequest = (req, state) => {
        socket.emit("answerReq", req, state);
    }

    const changeStatus = (status) => {
        socket.emit("changeStatus", status)
    }

    useEffect(() => {
        console.log(remoteUserSession)
    }, [remoteUserSession])

    return (
        <TeacherContext.Provider
            value={{
                createCall,
                answerCall,
                leaveCall,
                refreshVideos,
                setCall,
                getRemoteUserSession,
                sendMessage,
                toggleMic,
                toggleCam,
                createScreenShare,
                stopScreenShare,
                handleRequest,
                changeStatus,
                myVideoRef,
                remoteVideoRef,
                messages,
                lesson,
                mic,
                cam,
                screen,
                call,
                connected,
                elapsedTime,
                joinRequests,
                session,
                remoteUserSession,
            }}
        >
            {children}
        </TeacherContext.Provider>
    );
};

export { ContextProviderTeacher, TeacherContext };
