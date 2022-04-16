import { Layout } from "../components/Home/Layout";
import { useContext } from 'react';
import { SessionContext } from '../index'
import axios from 'axios'

export const Profile = () =>{
    const { session } = useContext(SessionContext)

    const logOutHandler = async () => {
        const data = await axios.get(`${process.env.REACT_APP_SERVER_IP}/logout`, { withCredentials: true });
        console.log(data.data);
        window.location.replace("/")
    };
    
    if (session == null) {
        window.location.replace("/")
        return;
    }

    return(
        <Layout>
            <div className="flex flex-col items-center space-y-24 pt-12">
                <div className="text-4xl">Profil</div>
                <div className="flex flex-col space-y-4 items-center text-center">
                    <div className="text-xl">Email: {session.email}</div>
                    <div className="text-xl">Kullanıcı adı: {session.name}</div>
                    <div className="text-xl">Hesap türü: {session.permission === "student" ? "Öğrenci" : "Öğretmen"}</div>
                    <img src={session.profilePicture} width="200" alt="profile"></img>
                    <button onClick={logOutHandler} className="bg-[#e27178] px-4 py-2 w-24 text-white rounded-lg">Çıkış yap</button>
                </div>
            </div>
        </Layout>
    );
}