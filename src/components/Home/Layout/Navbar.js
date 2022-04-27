import { useEffect, useState } from "react";
import { Footer } from "./Footer";
import { useContext } from 'react';
import { SessionContext } from '../../../index'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Navbar = () => {

  const { session } = useContext(SessionContext)

  const [sidebar, sidebarToggle] = useState(false);

  const NavbarItems = [
    {
      name: "Ders",
      href: "/lesson",
    },
    {
      name: "Pomodoro",
      href: "/pomodoro",
    },
    {
      name: "Paketler",
      href: "/pricing",
      last: true
    }
  ];
  const NavbarItemsMobile = [
    {
      name: "Ders",
      href: "/lesson",
    },
    {
      name: "Pomodoro",
      href: "/pomodoro",
    },
    {
      name: "Paketler",
      href: "/pricing",
    },
    {
      name: "Giriş Yap",
      href: "/login",
      last: true
    }
  ];

  return (
    <div>
      <ToastContainer autoClose={5000}/>
      
      <div className="flex flex-row py-8 justify-center space-x-16 items-center lg:hidden">
      <div><img src="/logo.png" width="144" height="55" alt="Logo"></img></div>
        <button onClick={() => sidebarToggle(true)}><img src="/images/nav.svg" width="36" alt="Navbar Toggle"/></button>
      </div>

      <div className={`${sidebar ? "relative z-50" : "hidden relative z-50"} lg:hidden`}>
        <div onClick={() => sidebarToggle(false)} className="fixed w-screen inset-0 bg-white opacity-30"></div>
        <div className="fixed top-0 bottom-0 left-0 flex flex-col justify-between items-center w-5/6 h-screen bg-[#181E2B]">
          <div className="flex flex-row justify-between items-center w-full px-8 pt-8">
            <div>
            <img src="/logo.png" width="140" height="55" alt="Logo"></img>
            </div>
            <div className="pt-2">
              <button onClick={() => sidebarToggle(false)}><img src="/images/nav-close.svg" width="20" alt="Navbar Close"/></button>
            </div>
          </div>
          <div className="flex flex-col self-start pl-8 text-[#9ca3af] space-y-4">
              {NavbarItemsMobile.map((item) => (
                  <div key={item.name}><a href={item.href} onClick={() => sidebarToggle(false)}>{item.name}</a></div> // DİKKAT BUG MAYBE
              ))}
          </div>
          <Footer /> 
        </div>
      </div>

      <div className="hidden lg:flex lg:flex-row lg:justify-between lg:items-center py-4 px-12 bg-[#f7eee5] sticky top-0">
        <div className="width-1/3"><img src="/logo.png" width="167" height="55" alt="Logo" className="hover:cursor-pointer" onClick={() => window.location.href = "/"}></img></div>
        <div className="width-1/3 pt-4 flex flex-row space-x-10 text-xl">
          {NavbarItems.map((item) => (
            <div key={item.name} className="flex flex-row pb-4 space-x-10" style={{"fontFamily" : "Lato", "fontWeight": "normal"}}>
              <a href={item.href}>{item.name}</a>
              <div className={item.last === true ? "hidden" : "visible"}>|</div>
            </div>
          ))}
        </div>
        <div className="width-1/3">
          <button onClick={() => window.location.href = session ? "/profile" : "/login"} className="bg-transparent hover:bg-blue-300 hover:text-white py-2 px-8 border border-blue-300 text-blue-300 hover:border-transparent rounded text-lg">
            {session ? "Profil" : "Giriş yap"}
          </button>
        </div>
      </div>
    </div>
  );
};
