import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { VideoChatContext } from '../../../ContextVideoChat';
import { Layout } from '../../Home/Layout';
import { Call } from '../Call/Call';
import { io } from 'socket.io-client';
import axios from 'axios'

const socket = io(`${process.env.REACT_APP_SERVER_IP}`);

export const Student = () => {
    const { myVideoRef, call, sendJoinReq, joinReq } = useContext(VideoChatContext);
    const [calls, setCalls] = useState([]);
    
    const handleForm = (event) => {
        event.preventDefault();

        const id = event.target.id

        if(id === "") return

        socket.emit("validateRoom", (id))
    }

    useEffect(() => {
        socket.on("validateRoom", (state, id) => {
            if (state === true) {
                sendJoinReq(id);
            }
            else if (state === false) {
                toast.error('Böyle bir oda bulunamadı!', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
            }
            else if (state === "full") {
                toast.error('Girmeye çalıştığın oda dolu!', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
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

    if (joinReq) return <Layout><div>Öğretmen bekleniyor.</div></Layout>
    if (call.active) return <Call></Call>
    else return (
        <Layout>
            <div className="flex flex-col items-center justify-center space-y-16">
                <div>Öğrenci</div>
                <video ref={myVideoRef} autoPlay muted className='h-80 w-96'></video>
                <div className="flex flex-col">
                    {calls.length === 0 ? <div>Henüz aktif bir öğretmen yok</div>: calls.map(call => (
                        <form onSubmit={handleForm} key={call.id} id={call.id}>
                            <div className='text-2xl'>Öğretmen: {call.users.find(user => user.id == call.id).session.name} - {call.teacherStatus}</div>
                            <div className='text-2xl'>Ders: {call.lesson}</div>
                            <button className='text-2xl px-4 py-2 bg-blue-300'>Katıl</button>
                        </form>
                    ))}
                </div>
            </div>
        </Layout>
    );
};
