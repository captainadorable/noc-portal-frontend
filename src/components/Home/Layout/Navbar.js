import { Logosvg } from "../../../SvgComponents/logo";
import { useState } from "react";
import { SessionContext } from "../../..";
import { useContext } from "react"

export const Navbar = () => {
    const { session } = useContext(SessionContext);
    window.onscroll = function(){scrolledscreen()}
    const [value, setvalue] = useState(true)
    function scrolledscreen() {  
        if(document.body.scrollTop > 80 || document.documentElement.scrollTop > 80){
            setvalue(false)
        }
        else{
            setvalue(true)
        }
    }
    const Navbar_links = (data) => {

        return(
            <a href={data.href} 
            className={`text-2xl font-light text-center text-[#7a94f3] border-[#7a94f3] hover:text-[#5365a6] hover:border-[#5365a6]`}>{data.name}</a>
        )
    }
    return(
           <div className={`z-50 transition delay-75 fixed inset-x-0  flex flex-row justify-between px-16 shadow-xl ${value ? "py-4 bg-[#344591]" : "py-2 bg-[#f7eee5]" }`}>
                <a href="/home" className="pt-1 lg:w-[150px] lg:h-[53px] w-[200px] h-[70px]"><Logosvg fill="#7a94f3"/></a>
                <div className="flex flex-row space-x-4 items-center text-xl">
                    <Navbar_links href="https://nonofficialcompany.com" name="Ana Sayfa" />
                    <Navbar_links href="/pomodoro" name="Pomodoro" />
                    <Navbar_links href="/lesson" name="Ders" />
                    <Navbar_links href="/pricing" name="Paketler" />
                </div>
                <div className="flex flex-row space-x-4">
                    <button 
                    onClick={() => window.location.href = session ? "/profile" : "/login"}
                    className={`text-2xl font-light text-center text-[#7a94f3] border-[#7a94f3] hover:text-[#5365a6] hover:border-[#5365a6]`}
                    >
                        {session ? "Profil" : "Giriş Yap"}
                    </button>
                </div>
            </div>
    );
}