import { useContext, useState } from 'react';
import { TeacherContext } from '../../../context/Lesson/Teacher';
import { Layout } from '../../Home/Layout';
import { SessionContext } from '../../..';
import { CallTeacher } from '../Call/CallTeacher';
import { Logosvg } from '../../../SvgComponents/logo';

const Navbar_links = (data) => {

    return(
        <a href={data.href} 
        className={`text-2xl font-light text-center text-[#7a94f3] border-[#7a94f3] hover:text-[#5365a6] hover:border-[#5365a6]`}>{data.name}</a>
    )
}

const subjects = {
    "9": ["Önermeler", "Kümeler", "Sayı Kümeleri"],
    "10": ["Sıralama ve Seçme", "Fonksiyon Kavramı", "Polinomlar"],
    "11": ["zzzzzzz", "bbbbbb", "ddddd"],
    "12": ["xxxxxxxxx", "cccccccccc", "ddddddd"]
}

export const Teacher = () => {
    const { createCall, myVideoRef, call } = useContext(TeacherContext);
    const { session } = useContext(SessionContext);
    const [dropdown, setDropdown] = useState(0)
    const [subject, setSubject] = useState("");
    const [grade, setGrade] = useState("0");

    const Dropdown_card = (props) => {
        return (
            <div className={`${dropdown === props.number ? "bg-[#1a1e2b] rounded-xl" : "rounded-xl"}`}>
                        <button onClick={() => setDropdown(dropdown === props.number ? 0 : props.number)} className={` ${dropdown === props.number ? "text-[#7a94f3]" : "text-white"} w-full h-16 hover:bg-[#1a1e2b] text-left text-4xl p-2 rounded-xl`}>
                            {props.class}. sınıf
                        </button>
                        <div className={dropdown === props.number ? "flex flex-col space-y-3 text-left p-4" : "hidden"}>
                            {subjects[props.class].map(subj => (
                                <div className='flex flex-row items-center space-x-4 hover:cursor-pointer' onClick={() => {setSubject(subj); setGrade(parseInt(props.number) + 8)}}>
                                    <div clas
                                    >
                                        <div className={`rounded-full  w-5 h-5  border-[#7a94f3] border-2 ${subj === subject ? "bg-[#7a94f3]" : ""}`}></div>
                                    </div>
                                    <button className={`text-left h-8 xl:text-xl 2xl:text-2xl  ${subj === subject ? "text-[#7a94f3]" : ""}`} >{subj}</button>
                                    
                                </div>
                                
                            ))}
                        </div>
            </div>
        )
    }

    const startLesson = (event) => {
        event.preventDefault();

        if (subject === "" ) return 
        
        createCall(subject); // Konu ve dersi beraber al
    }
    
    if (call.active) return <CallTeacher></CallTeacher>
    else return (
    <div className="w-screen h-screen flex">
        <div className="h-full w-3/12 bg-[#151822] py-8 px-3 flex flex-col space-y-2 items-center">
            <h1 className="text-center text-[#7a94f3] text-3xl">Konular</h1>
            <div className="flex flex-col pt-12 text-white overflow-y-auto w-full pl-4">
                <Dropdown_card class="9" number="1"/>
                <Dropdown_card class="10" number="2"/>
                <Dropdown_card class="11" number="3"/>
                <Dropdown_card class="12" number="4"/>
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
            <div className='flex flex-col items-center justify-center h-full space-y-8 bg-[#1a1e2b]'>
                    <div className="flex justify-center items-center ">
                    <div className='flex flex-row space-x-10 items-center'>
                            <div className='flex flex-col space-y-4 p-4 border-l-8 border-b-8 border-2 rounded-2xl border-[#7a94f3]'>
                                <div className='text-2xl text-white'>Ders: Matematik</div>
                                <div className='text-2xl text-white border-t-2 pt-2'>Sınıf: {grade}.sınıf</div>
                                <div className='text-2xl text-white border-t-2 pt-2'>Konu: {subject}</div>
                            </div>
                            <div className='flex flex-col items-center space-y-10 '>
                                <div className='text-4xl text-center text-[#7a94f3]'>{session.name}</div>
                                <video ref={myVideoRef} autoPlay muted width={450} className="rounded-xl border-b-8 border-2 border-l-8 border-[#7a94f3]"></video>
                                <button 
                                onClick={startLesson}
                                className={`w-40 text-2xl font-light text-center text-[#7a94f3] border-2 border-[#7a94f3] hover:text-[#5365a6] hover:border-[#5365a6] bg-[#151822] px-4 py-2 rounded-lg`}
                                > 
                                Dersi Başlat
                                </button>
                            </div>                            
                    </div>                
                </div>
            </div> 
        </div>
    </div>
    )
};