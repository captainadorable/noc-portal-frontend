import { useContext, useEffect, useRef, useState } from 'react';
import { StudentContext } from '../../../context/Lesson/Student';

import { IoMdArrowDropright } from 'react-icons/io';

import {
    BsFillMicFill,
    BsFillMicMuteFill,
    BsFillCameraVideoFill,
    BsFillCameraVideoOffFill,
    BsFillTelephoneXFill,
} from 'react-icons/bs';


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
    const [time, setTime] = useState("");

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

        if (!onCooldown) {
            const text = event.target.elements.msg.value;

            if (text === '') return;

            sendMessage(text.slice(0, 256));
            event.target.elements.msg.value = '';

            setOnCooldown(true);
            setTimeout(() => setOnCooldown(false), 3000);
        } else {
            console.log('COOLDOWN BRO CALM DOWN AMK');
        }
    };

    useEffect(() => {
        var minutes = Math.floor(elapsedTime / 60000);
        var seconds = ((elapsedTime % 60000) / 1000).toFixed(0);
        setTime(`${minutes < 10 ? "0" : ""}` + minutes + ":" + (seconds < 10 ? '0' : '') + seconds)
    }, [elapsedTime])

    return (
        <div className="w-full h-screen flex">
            <div className={connected ? "w-10/12 grid grid-rows-3 place-items-center space-y-6 justify-center pt-10" : "w-10/12 grid grid-rows-4 place-items-center space-y-6 justify-center pt-10"}>
                <div className="flex flex-row items-center justify-center space-x-6">
                    <img src="/images/logo.png" alt="Logo" className="w-48 hover:cursor-pointer" onClick={() => window.location.href = "/home"}/>
                    <IoMdArrowDropright size={70} fill="#5167a6" />
                    <h1 className="flex items-center text-2xl font-bol text-[#5064a7]">Ders: {lesson} </h1>
                    <div>Geçen süre: {time}</div>
                </div>

                <div className={screen ? "flex flex-col items-center justify-center space-y-16" : "flex flex-row items-center justify-center space-x-5"}>
                    <div className="overflow-hidden border-2 rounded-2xl border-[#5167a6] grid items-stretch justify-items-stretch w-fit h-fit">
                        <video controls ref={remoteVideoRef} autoPlay className={screen ? "h-[360px] w-[640px]" : "h-80 w-96"}/>
                    </div>
                    <div className="overflow-hidden border-2 rounded-2xl border-[#5167a6] grid items-stretch justify-items-stretch w-fit h-fit">
                        <video controls ref={myVideoRef} autoPlay muted className={screen ? "h-[110px] w-[128px]" : "h-80 w-96"}/>
                    </div>
                </div>

                <div className="flex space-x-10 bg-[#292b2f] px-10 py-5 rounded-full shadow-lg justify-center ">
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
            <div className="w-2/12 h-full bg-[#121721] flex flex-col space-y-5 py-4 px-5 ">
                <div className="flex flex-col space-y-2">
                    <div className="text-center text-white text-xl">Kullanıcılar</div>
                    <div className="flex space-x-2">
                        <img className="w-8 rounded-full" src={session.profilePicture} alt="avatar" />
                        <h1 className="flex items-center text-[#e0eaff] text-sm w-24 truncate">{session.name}</h1>
                        <h1 className="flex items-center text-[#e0eaff] text-sm ">
                            [{session.permission === 'teacher' ? 'Öğretmen' : 'Öğrenci'}]
                        </h1>
                    </div>
                    {remoteUserSession && (
                        <div className="flex space-x-2">
                            <img className="w-8 rounded-full" src={remoteUserSession.profilePicture} alt="avatar" />
                            <h1 className="flex items-center text-[#e0eaff] text-sm w-24 truncate">
                                {remoteUserSession.name}
                            </h1>
                            <h1 className="flex items-center text-[#e0eaff] text-sm ">
                                [{remoteUserSession.permission === 'teacher' ? 'Öğretmen' : 'Öğrenci'}]
                            </h1>
                        </div>
                    )}
                </div>

                <div className="h-4/6 flex flex-col space-y-1" >
                    <h1 className=" text-center text-white text-lg">Chat</h1>
                    <div
                        className="focus:outline-none h-full block bg-white border-4 border-[#4e6394] rounded-lg p-4 overflow-y-auto"
                        ref={messagesRef}
                        id="chat"
                    >
                        {messages.map((message) => (
                            <div className="w-full">
                                <div className="font-bold float-left pr-2">[{message.sender.name}]:</div>
                                <div className="break-all">{message.message}</div>
                            </div>
                        ))}
                    </div>
                </div>
                <form onSubmit={handleSendMessage} className="flex flex-col space-y-4">
                    <input
                        name="msg"
                        type="text"
                        placeholder="Message"
                        className={messageInputConfig[onCooldown ? 'onCooldown' : 'canWrite']}
                        required
                    />
                    <button className="w-full p-2 text-lg bg-blue-300 rounded-lg">Send</button>
                </form>
            </div>
        </div>
    );
};
