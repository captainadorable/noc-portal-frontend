import { useContext, useEffect, useState } from 'react';
import { VideoChatContext } from '../../../ContextVideoChat';
import { Layout } from '../../Home/Layout';
import { Call } from '../Call/Call';
import { io } from 'socket.io-client';
import axios from 'axios'

const socket = io(`${process.env.REACT_APP_SERVER_IP}`);

export const Student = () => {
    const { answerCall, myVideoRef, call, setCall } = useContext(VideoChatContext);
    const [calls, setCalls] = useState([]);
    
    const handleForm = (event) => {
        event.preventDefault();

        let id = event.target.elements.connectid.value    

        if(id === "") return

        socket.emit("validateRoom", (id))
    }

    useEffect(() => {
        socket.on("validateRoom", (state, id) => {
            if (state) {
                answerCall(id);
            }
            else {
                console.log("Room Not Found")
            }
        });
    }, [])

    const getCalls = async () => {
        if (!call.active) {
            const data = await axios.get(`${process.env.REACT_APP_SERVER_IP}/api/getCalls`, { withCredentials: true })
            setCalls(ex => data.data)
        }
    }

    useEffect(() => {
        getCalls()
        
        const timer = setInterval(() => {
            getCalls()
        }, 1500)

        return () => clearInterval(timer)
    }, []);

    if (call.active) return <Call></Call>
    else return (
        <Layout>
            <div className="flex flex-col items-center justify-center space-y-16">
                <div>Öğrenci</div>
                <video ref={myVideoRef} width={400} autoPlay muted></video>
                <div className="flex flex-col">
                    {calls.length === 0 ? <div>Henüz bekleyen bir arama yok</div>: calls.map(call => (
                        <>
                            <div className='text-2xl'>ID: {call.id}</div>
                        </>
                    ))}
                </div>
                <form onSubmit={handleForm} className="flex flex-col space-y-4">
                    <input name="connectid" type="text" placeholder="ID" className="border-2 shadow p-2" />
                    <button className="bg-blue-300 text-white p-4 rounded-lg">Ara</button>
                </form>
            </div>
        </Layout>
    );
};
