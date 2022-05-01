import React, { createContext, useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import axios from 'axios';

import { Home } from './pages/Home';
import { Pomodoro } from './pages/Pomodoro';
import { Pricing } from './pages/Pricing';
import { Lesson } from './pages/Lesson';
import { Page404 } from './pages/Page404';
import { Login } from './pages/Login';
import { Profile } from './pages/Profile';
import { LoadingPage } from './pages/Loading';

const root = ReactDOM.createRoot(document.getElementById('root'));

export const SessionContext = createContext();
export const SessionProvider = ({ children }) => {
    const [session, setSession] = useState({});

    const getSession = async () => {
        try {
            const session = await axios.get(`${process.env.REACT_APP_SERVER_IP}/me`, { withCredentials: true });
            console.log(`Get Session`, session.data);
            
            setSession(session.data);
        } catch (err) {
            console.log(err);
            setSession(null);
        }
    };
    useEffect(() => {
        getSession();
    }, []);

    return <SessionContext.Provider value={{ session }}>{children}</SessionContext.Provider>;
};

const Index = () => {
    return (
      <SessionProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LoadingPage />} />
                    <Route path='/home' element={<Home />}/>
                    <Route path="/pomodoro" element={<Pomodoro />} />
                    <Route path="/pricing" element={<Pricing />} />
                    <Route path="/lesson" element={<Lesson />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/*" element={<Page404 />} />
                </Routes>
            </BrowserRouter>
        </SessionProvider>
    )
}

root.render(<Index />)
