import { useContext, useEffect, useRef, useState } from 'react';
import { StudentContext } from '../../../context/Lesson/Student';


import {
    BsFillMicFill,
    BsFillMicMuteFill,
    BsFillCameraVideoFill,
    BsFillCameraVideoOffFill,
    BsFillTelephoneXFill,
} from 'react-icons/bs';

import { toast, ToastContainer } from 'react-toastify';

const messageInputConfig = {
    onCooldown:
        'ring-4 ring-[#b22f25] block w-full py-2 pl-4 rounded-full outline-none placeholder-lg placeholder-[#181e2b]',
    canWrite:
        'ring-4 ring-[#4e6394] block w-full py-2 pl-4 rounded-full outline-none placeholder-lg placeholder-[#181e2b]',
};

export const CallStudent = () => {
    const {
        leaveCall,
        toggleMic,
        toggleCam,
        sendMessage,
        myVideoRef,
        remoteVideoRef,
        refreshVideos,
        remoteUserSession,
        session,
        call,
        messages,
        lesson,
        connected,
        elapsedTime,
        mic,
        cam,
        screen,
    } = useContext(StudentContext);
    const messagesRef = useRef();
    const [onCooldown, setOnCooldown] = useState(false);
    const [time, setTime] = useState('');

    useEffect(() => {
        refreshVideos();
    }, []);

    useEffect(() => {
        if (messagesRef.current) {
            messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
        }
    }, [messages]);

    const handleLeave = (event) => {
        event.preventDefault();
        leaveCall(call.id);
    };

    const handleSendMessage = (event) => {
        event.preventDefault();
        if (connected) {
            if (!onCooldown) {
                const text = event.target.elements.msg.value;
    
                if (text === '') return;
    
                sendMessage(text.slice(0, 256));
                event.target.elements.msg.value = '';
    
                setOnCooldown(true);
                setTimeout(() => setOnCooldown(false), 3000);
            } else {
                toast.error('Mesajlarını gönderirken biraz yavaşlaman gerek!', {
                    position: "bottom-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        }
        else {
            toast.error('Henüz bir bağlantı kurulmadı!', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    useEffect(() => {
        var minutes = Math.floor(elapsedTime / 60000);
        var seconds = ((elapsedTime % 60000) / 1000).toFixed(0);
        setTime(`${minutes < 10 ? '0' : ''}` + minutes + ':' + (seconds < 10 ? '0' : '') + seconds);
    }, [elapsedTime]);

    return (
        <div className="w-full xl:h-full h-full flex bg-[#1a1e2b]">
            <ToastContainer />
            <div className="w-10/12 bg-[#1a1e2b]  xh-full  2xl:h-screen flex  flex-col space-y-20  py-20">
                <div className="flex flex-col space-y-5">
                    <div className="flex flex-row space-x-10 justify-center ">
                        <a href="/lesson" className="flex items-center ">
                            <img id="arrow" src="/images/arrow.svg" alt="" className=" w-12 hover:cursor-pointer" />
                        </a>
                        <img
                            src="/images/logo.png"
                            alt="Logo"
                            className="w-48 hover:cursor-pointer"
                            onClick={() => (window.location.href = '/home')}
                        />
                    </div>
                    <div className="flex flex-row space-x-4 justify-center">
                        <div className="text-3xl font-light text-[#7a94f3] flex items-center">Ders: Matematik</div>
                        <div className="items-center flex text-3xl text-[#7a94f3]">-</div>
                        <div className="text-3xl font-light text-[#7a94f3] flex items-center">Konu: {lesson}</div>
                        <div className="items-center flex text-3xl text-[#7a94f3]">-</div>
                        <div className="w-64 text-3xl font-light text-[#7a94f3] flex items-center">
                            Geçen süre: {time}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col space-y-32">
                    <div
                        className={
                            screen
                                ? 'flex flex-row items-center justify-center space-x-10'
                                : 'flex flex-row items-center justify-center space-x-5'
                        }
                    >
                        <div className="overflow-hidden  border-2 border-b-8 border-l-8 rounded-2xl border-[#5167a6] grid items-stretch justify-items-stretch w-fit h-fit">
                            <video
                                controls
                                ref={remoteVideoRef}
                                autoPlay
                                className={screen ? 'h-[360px] w-[640px]' : 'h-80 w-96 '}
                            />
                        </div>

                        <div className="overflow-hidden  border-2 border-b-8 border-l-8 rounded-2xl border-[#5167a6] grid items-stretch justify-items-stretch w-fit h-fit">
                            <video
                                controls
                                ref={myVideoRef}
                                autoPlay
                                muted
                                className={screen ? 'h-[110px] w-[128px]' : 'h-80 w-96'}
                            />
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <div className="flex  flex-row  w-72 space-x-10 bg-[#292b2f] px-10 py-5 rounded-full shadow-lg justify-center ">
                            <button onClick={toggleMic}>
                                {mic ? (
                                    <BsFillMicFill size={32} fill="#dadbdc" />
                                ) : (
                                    <BsFillMicMuteFill size={32} fill="#b22f25" />
                                )}
                            </button>
                            <button onClick={toggleCam}>
                                {cam ? (
                                    <BsFillCameraVideoFill size={32} fill="#dadbdc" />
                                ) : (
                                    <BsFillCameraVideoOffFill size={32} fill="#b22f25" />
                                )}
                            </button>
                            <button onClick={handleLeave}>
                                <BsFillTelephoneXFill size={32} fill="#b22f25" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-2/12 fixed right-0 h-screen bg-[#121721] flex flex-col space-y-10 py-4 px-5 ">
                <div className="h-1/6 flex flex-col space-y-2">
                    <div className="text-center text-[#7a94f3] text-xl xl:text-2xl">Kullanıcılar</div>
                    <div className="flex flex-col space-y-4">
                        <div className="flex flex-row space-x-4">
                            <img src={session.profilePicture} alt="" className="border-2 rounded-full w-10 h-10" />
                            <h1 className="truncate flex items-center text-center text-lg text-white">
                                {session.name}
                            </h1>
                        </div>
                        <div className="flex flex-row space-x-4">
                            <img
                                src={remoteUserSession.profilePicture}
                                alt=""
                                className="border-2 rounded-full w-10 h-10"
                            />
                            <h1 className="truncate flex items-center text-center text-lg text-white">
                                {remoteUserSession.name}
                            </h1>
                        </div>
                    </div>
                </div>
                <div className="h-4/6 flex flex-col space-y-1">
                    <h1 className=" text-center text-[#7a94f3] text-lg xl:text-xl">Chat</h1>
                    <div className="h-full bg-[#1a1e2b] border-2 border-[#7a94f3] rounded-2xl overflow-y-auto text-white p-4" ref={messagesRef}>
                        {messages.map((message) => (
                            <div className="w-full">
                                <div className="font-bold float-left pr-2">[{message.sender.name}]:</div>
                                <div className="break-all">{message.message}</div>
                            </div>
                        ))}
                    </div>
                </div>
                <form
                    onSubmit={handleSendMessage}
                    className="h-1/6 flex flex-col space-y-4 justify-center items-center"
                >
                    <input
                        type="text"
                        className="focus:outline p-2 h-3/6 w-full bg-[#1a1e2b] border-2 border-[#7a94f3] rounded-2xl text-white"
                        placeholder='Bir mesaj yaz'
                        name='msg'
                    />

                    <button className="h-3/6  lg:text-lg xl:text-xl 2xl:text-2xl bg-[#1a1e2b] text-white transistion delay-100 duration-100 w-full hover:bg-[#121721] hover:w-44 border-r-4 border-l-4 border-[#7a94f3] rounded-2xl">
                        gönder
                    </button>
                </form>
            </div>
        </div>
    );
};
