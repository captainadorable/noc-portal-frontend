// Video Chat

import React, { createContext, useState, useRef, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { io } from 'socket.io-client';
import Peer from 'simple-peer';
import axios from 'axios'

const PomodoroContext = createContext();

const socket = io(`${process.env.REACT_APP_SERVER_IP}`);

const ContextProvider = ({ children }) => {
    const { roomId } = useParams();    
    const [Me, setMe] = useState({});
    const [peers, setPeers] = useState([]);
    const socketRef = useRef();
    const peersRef = useRef([]);


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


    if (session === null) {
        window.location.replace("/login")
    }

    useEffect(() => {
        if (session === null) return
        socketRef.current = socket
        navigator.mediaDevices.getUserMedia({ video: false, audio: true }).then(async (currentStream) => {
            const user = await axios.get(`${process.env.REACT_APP_SERVER_IP}/me`, { withCredentials: true })
            const userData = {id: socket.id, email: user.data.email, name: user.data.name, permission: user.data.permission, pp: user.data.profilePicture}
            socketRef.current.emit("join pomodoro room", roomId, userData)
            socketRef.current.on("all users", users => {
                const peers = [];
                users.forEach(user => {
                    const peer = createPeer(user.id, userData, currentStream);
                    peersRef.current.push({ id: user.id, peer })
                    peers.push({ user, peer })
                });
                setPeers(peers)
            });

            socketRef.current.on("user disconnected", (userId) => {
                setPeers(ex => ex.filter(x => {return x.user.id !== userId}))
                peersRef.current = peersRef.current.filter(x => {return x.id !== userId})
            })

            socketRef.current.on("user joined", data => {
                const peer = addPeer(data.signal, data.caller.id, currentStream)
                peersRef.current.push({ id: data.callerId, peer})

                setPeers(ex => [...ex, { user: data.caller, peer }]);
            });

            socketRef.current.on("receiving returned signal", data => {
                const item = peersRef.current.find(p => p.id === data.id)
                item.peer.signal(data.signal);
            });
        });

    }, []);

    const createPeer = (to, caller, stream) => {
        console.log("createpeer")
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream
        })

        peer.on("signal", signal => {
            socketRef.current.emit("sending signal", { to, caller, signal })
        });

        return peer
    }
    const addPeer = (incomingSignal, callerId, stream) => {
        console.log("addpeer") 
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream
        });

        peer.on("signal", signal => {
            socketRef.current.emit("returning signal", { signal, to: callerId });
        });

        peer.signal(incomingSignal);

        return peer;
    }

    return <PomodoroContext.Provider value={{
        peers,
        Me
    }}>{children}</PomodoroContext.Provider>;
};

export { ContextProvider, PomodoroContext };
