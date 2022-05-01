import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { StudentContext } from '../../../context/Lesson/Student';
import { Layout } from '../../Home/Layout';
import { CallStudent } from '../Call/CallStudent';
import { io } from 'socket.io-client';
import axios from 'axios'
import { SessionContext } from '../../..';
import { Footer } from '../../Home/Layout/Footer';
import { Logosvg } from '../../../SvgComponents/logo';

const socket = io(`${process.env.REACT_APP_SERVER_IP}`);

const stats = { "available" : <span className='text-green-500 pl-2'>Aktif</span>, "dnd" : <span className='text-red-500 pl-2'>Rahatsız Etmeyin</span>, "idle" : <span className='text-yellow-500 pl-2'>Uzakta</span>}
const buttons = { "available" : { className: "bg-blue-400 py-2 px-4 rounded-lg text-white" }, "dnd" : {className: "bg-red-400 py-2 px-4 rounded-lg text-white", disabled: true}, "idle" : {className:"bg-red-400 py-2 px-4 rounded-lg text-white", disabled: true}}


const Navbar_links = (data) => {

    return(
        <a href={data.href} 
        className={`text-2xl font-light text-center text-[#7a94f3] border-[#7a94f3] hover:text-[#5365a6] hover:border-[#5365a6]`}>{data.name}</a>
    )
}

export const Student = () => {
    const { myVideoRef, call, sendJoinReq, joinReq } = useContext(StudentContext);
    const [calls, setCalls] = useState([]);
    const { session } = useContext(SessionContext);
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
            else if (state === "teacherUnavailable") {
                toast.error('Öğretmen hazır değil!', {
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
    if (call.active) return <CallStudent></CallStudent>
    else return (
        <div className="w-screen h-screen flex">
            <div className="h-full w-3/12 bg-[#151822] py-8 px-3 flex flex-col space-y-2 items-center">
                <h1 className="text-center text-[#7a94f3] text-3xl">Öğretmenler</h1>
                <div className="flex flex-col space-y-4 pt-12 text-white overflow-y-auto">
                    {calls.length > 0 ? calls.map(call =>(
                        <form onSubmit={handleForm} className="flex flex-row space-x-3 text-[#444d6e]" id={call.id}>
                            <div className="flex flex-row space-x-5">
                                <img className="rounded-full h-10 " src={call.users.find(user => user.id == call.id).session.profilePicture} alt="" />
                                <h1 className="flex items-center text-[#7a94f3]">{call.users.find(user => user.id == call.id).session.name} - {stats[call.teacherStatus]}</h1>

                            </div>
                            <button {... buttons[call.teacherStatus]}>İstek gönder</button>
                        </form>
                    )) : "Aktif öğretmen yok"}
                </div>
            </div>
            <div className="w-9/12 h-full flex flex-col ">    
                <nav className=" w-full px-16 justify-between flex flex-row py-4 bg-[#151822]">
                    <div className="pt-1 lg:w-[150px] lg:h-[53px] w-[200px] h-[70px]">
                        <a href="/home" ><Logosvg fill="#7a94f3"/></a>
                    </div>
                    <div className='flex flex-row space-x-4 items-center'>
                        <Navbar_links href="/pomodoro" name="Pomodoro"/>
                        <button 
                        onClick={() => window.location.href = session ? "/profile" : "/login"}
                        className={`text-2xl font-light text-center text-[#7a94f3] border-[#7a94f3] hover:text-[#5365a6] hover:border-[#5365a6]`}
                        >
                            {session ? "Profil" : "Giriş Yap"}
                        </button>
                    </div>
                </nav>
                <div className='flex flex-col items-center justify-center h-full space-y-4 bg-[#1a1e2b]'>
                    <div className='text-4xl  text-[#7a94f3]'>{session.name}</div>
                    <div className="flex justify-center items-center ">
                        <video ref={myVideoRef} autoPlay muted width={450} className="rounded-xl border-b-4 border-l-8 border-[#7a94f3]"></video>
                    </div>
                </div>
                
            </div>
        </div>
    );
};
