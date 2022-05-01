import { Layout } from '../components/Home/Layout';
import { useContext } from 'react';
import { SessionContext } from '../index';
import axios from 'axios';

export const Profile = () => {
    const { session } = useContext(SessionContext);
    const text = [
        'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit',
        '',
        '',
    ];
    const logOutHandler = async () => {
        const data = await axios.get(`${process.env.REACT_APP_SERVER_IP}/logout`, { withCredentials: true });
        console.log(data.data);
        window.location.replace('/home');
    };

    if (session == null) {
        window.location.replace('/login');
        return;
    }
    const Status_card = (props) => {
        return (
        <div className="flex flex-col space-y-2">
            <h1 className={`text-3xl ${props.color1} text-center`}>
                {props.name}
            </h1>
            <h1 className="text-2xl ">{props.ders} tane <span className="text-white">ders</span> </h1>
            <h1 className="text-xl text-center">Toplam</h1>
            <h1 className={`text-center text-4xl ${props.color2}`}>{props.dk} dk</h1>
         </div>

        )

    }
    
    return (
        <Layout>
            <div className="flex flex-col space-y-24 items-center pt-32 px-20 ">
                <div className="text-4xl text-center text-white">Profil</div>
                <div className="flex flex-col space-y-20 ">
                    <div className="flex flex-row space-x-10 justify-center">
                        <div className="w-1/12">
                            <img src={session.profilePicture} alt="" className="w-full rounded-full" />
                        </div>
                        <div className="w-7/12 flex-col flex space-y-5 justify-center text-white">
                            <h1 className="text-2xl">{session.name}</h1>
                            <p className="text-lg">{text[0]}</p>
                        </div>
                    </div>
                    <div className="flex flex-col space-y-10 justify-center items-center">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-[#182044] p-6 rounded-xl flex-col flex text-white">
                                <h1 className="text-2xl">{session.name}, </h1>
                                <div className="flex flex-row space-x-1">
                                    <h1 className="items-center text-xl flex">Bu zamana kadar toplam </h1>
                                    <h1 className="text-4xl text-[#3b82f6]"> 340dk </h1>
                                </div>
                                <h1 className="text-xl"> ders yaptın</h1>
                            </div>
                            <div className="bg-[#182044] p-6 rounded-xl flex-col flex text-white">
                                <h1 className="text-2xl">{session.name}, </h1>
                                <div className="flex flex-row space-x-1">
                                    <h1 className="items-center text-xl flex">Bu zamana kadar toplam </h1>
                                    <h1 className="text-4xl text-[#a7d129]"> 242 tane </h1>
                                </div>
                                <h1 className="text-xl"> ders yaptın</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row space-x-5">
                    <button onClick={() => console.log("dur kanka yapmadık daha amk")} className="bg-blue-400 px-4 py-2 w-24 text-white rounded-lg">
                        Düzenle
                    </button>
                    <button onClick={logOutHandler} className="bg-[#e27178] px-4 py-2 w-24 text-white rounded-lg">
                        Çıkış yap
                    </button>
                </div>
            </div>
        </Layout>
    );
};
