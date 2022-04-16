// Video Chat

import React, { createContext, useState, useRef, useEffect } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';
import axios from 'axios'

const VideoChatContext = createContext();

const socket = io(`${process.env.REACT_APP_SERVER_IP}`);

const ContextProvider = ({ children }) => {
    const [Me, setMe] = useState({});
    const [state, setState] = useState(''); //waiting call, making call, teacher, student
    const [callAccepted, setCallAccepted] = useState(false);
    const [callWaiting, setCallWaiting] = useState(false);
    const [lesson, setLesson] = useState('');
    const [stream, setStream] = useState(); // My stream
    const [call, setCall] = useState({}); // Call props


    const [session, setSession] = useState({});
    const getSession = async () => {
        const session = await axios.get(`${process.env.REACT_APP_SERVER_IP}/me`, { withCredentials: true })
        console.log(session.data);
        setSession(session.data);
    }
    useEffect(() => {
        getSession();
    }, [])

    useEffect(() => {
        console.log("SESSION UPDATED", session)
        if (session !== {}) {
            setMe({ id: socket.id, email: session.email, name: session.name, permission: session.permission, pp: session.profilePicture })
        }
    }, [session]);


    const myVideoRef = useRef();
    const userVideoRef = useRef(); // Video of the other user
    const connectionRef = useRef();

    if (session === null) {
        window.location.replace("/")
    }

    const refreshMyVideoRef = () => {
        myVideoRef.current.srcObject = stream;
    }

    useEffect(() => {
        console.log("CONTEXT", session)
        if(session === {}) return

        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((currentstream) => {
            setStream(currentstream);

            myVideoRef.current.srcObject = currentstream;
            console.log('My stream', currentstream);
        });

        socket.on('callUser', ({ signal,  callFrom }) => {
            setCall({ isReceivingCall: true, from: callFrom,  signal }); // Set the call object to incoming call props
            console.log("call user", callFrom)
        });
    }, []); // Call once

    const waitForCall = () => {
        if (session.permission !== "teacher") return;

        setState('waitingCall');
        console.log("bu ben", Me.id)
        socket.emit('waitingCall', { initiator: Me, lesson }); // send initiatorName, initiatorId , lessonName to server. server is going to create a variable for u
    };

    const answerCall = () => {
        setCallAccepted(true); // Accept call

        const peer = new Peer({ initiator: false, trickle: false, stream }); // Inıtator false becaue i am answering the call , discable trickle (idk what it is), pass my stream data

        peer.on('signal', (data) => {
            // Listen signal, get data and send signal to other user
            socket.emit('answerCall', { signal: data, to: call.from, from: Me });
        });

        peer.on('stream', (currentStream) => {
            // Set other user's video data
            userVideoRef.current.srcObject = currentStream;
            console.log('My video ref', myVideoRef);
            console.log('Stream on', userVideoRef);
        });

        peer.signal(call.signal);
        
        socket.on('userLeft', () => {
            console.log("user leftt")
            setCall({}) // if student left room set call to nothing
            window.location.reload();
        });

        connectionRef.current = peer;
    };

    const callUser = (id) => {
        const peer = new Peer({ initiator: true, trickle: false, stream }); // Initator true because i am calling, disable trickle, pass my stream data
        setCallWaiting(true);

        peer.on('signal', (data) => {
            socket.emit('callUser', { userToCall: id, callFrom: Me, signal: data }); // emit callUser event to server with userToCall id, signal data, my id, my name
        });

        peer.on('stream', (currentStream) => {
            // Wait for stream signal get data and set other user's video
            userVideoRef.current.srcObject = currentStream;
            console.log('My video ref', myVideoRef);
            console.log('Stream on', userVideoRef);
        });

        socket.on('callAccepted', ({ signal, from }) => {
            // When call accepted set call accepted to true and send signal to other peer
            setCallAccepted(true);
            setCall({ from })

            peer.signal(signal);

            console.log('Call Accepted, Signal: ', signal);
        });

        socket.on('userLeft', () => {
            setCall({})
            window.location.reload(); // If teacher left from room than reload the page and leave from room
        });

        connectionRef.current = peer;
    };

    const leaveCall = () => {
        connectionRef.current ? connectionRef.current.destroy() : console.log("There is no connection.") //Destroy the connection object

        window.location.reload(); //Refresh page
    };

    return (
        <VideoChatContext.Provider
            value={{
                call,
                callAccepted,
                myVideoRef,
                userVideoRef,
                stream,
                Me,
                callUser,
                leaveCall,
                answerCall,
                refreshMyVideoRef,
                state,
                setState,
                waitForCall,
                lesson,
                setLesson,
                callWaiting
            }}
        >
            {children}
        </VideoChatContext.Provider>
    );
};

export { ContextProvider, VideoChatContext };