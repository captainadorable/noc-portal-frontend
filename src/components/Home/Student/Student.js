
import { useEffect } from "react"
import { Layout } from "../Layout"
export const Student = (props) => {
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
    const Lastthree = (props) => {
        return(
            <div className=" bg-[#182044] p-4 rounded-2xl text-white">
                <div className="flex flex-row">
                    <div className="flex flex-col space-y-2 item-center pr-5">
                        <div className="flex justify-center">
                            <img src={props.photo} 
                            alt="Avatar_img"
                            className=" w-16 rounded-full border-2 border-"
                            />
                        </div>
                        <h1 className="flex text-center text-2xl">{props.name}</h1>
                    </div>
                    <div className="flex flex-col space-y-3 border-l-2 pl-5">
                        <h1 className={`text-left text-lg ${props.color}`}>
                        {props.lesson}
                        </h1>  
                        <h1 className=" text-center text-3xl">
                        {props.time}
                        </h1>   
                        <h1 className="text-center">
                        {props.date}
                        </h1>
                    </div>
                </div>                            
            </div>
        )
    }
    
    return(
       <Layout>
            <div className="pt-32 px-10 flex flex-col space-y-20">
                <div className=" text-xl text-[#7a94f3] flex flex-row space-x-2">
                    <a href="/home" className="hover:underline hover:underline-offset-2">Anasayfa</a>
                    <span>-</span>
                    <h1>{props.session.name}</h1>
                </div>  
                <div className="text-center text-4xl text-white flex flex-col space-y-10">
                   <h1>
                    Portala hoş geldin {props.session.name}   
                    </h1>
                    <h1>
                    Bu haftaki durumun
                    </h1>
                </div>
                <div className="flex flex-col space-y-10 justify-center items-center">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-[#182044] p-6 rounded-xl flex-col flex text-white">
                            <h1 className="text-2xl">{props.session.name}, </h1>
                            <div className="flex flex-row space-x-1">
                                <h1 className="items-center text-xl flex">Bu hafta toplam </h1>
                                <h1 className="text-4xl text-[#3b82f6]"> 340dk </h1> 
                            </div>
                            <h1 className="text-xl"> ders yaptın</h1>
                        </div>
                        <div className="bg-[#182044] p-6 rounded-xl flex-col flex text-white">
                            <h1 className="text-2xl">{props.session.name}, </h1>
                            <div className="flex flex-row space-x-1">
                                <h1 className="items-center text-xl flex">Bu hafta toplam </h1>
                                <h1 className="text-4xl text-[#a7d129]"> 242 tane </h1> 
                            </div>
                            <h1 className="text-xl"> ders yaptın</h1>
                        </div>
                    </div>
                    <div className="bg-[#182044] w-full p-6 rounded-xl grid grid-flow-col grid-rows-1 place-items-center text-white">
                        <Status_card name="Matematik" color1="text-[#3b82f6]" color2="text-[#3d6cff]" ders="23" dk="200"/>
                        <Status_card name="Edebiyat" color1="text-[#ff0000]" color2="text-[#cc0000]" ders="12" dk="185"/>
                        <Status_card name="Kimya" color1="text-[#a7d129]" color2="text-[#698419]" ders="32" dk="69"/>
                        <Status_card name="Biyoloji" color1="text-[#72c78d]" color2="text-[#549368]" ders="11" dk="101" />
                        <Status_card name="İngilizce" color1="text-[#87469a]" color2="text-[#542b52]" ders="5" dk="123" />
                        <Status_card name="Fizik" color1="text-[#63b0b8]" color2="text-[#477f84]" ders="9" dk="154" />
                    </div>
                    <div className="text-center text-4xl text-white">Son yapılan dersler</div>
                    <div className="grid grid-rows-1 gap-4 grid-flow-col place-items-center">
                        <Lastthree photo="https://pbs.twimg.com/profile_images/1151410974240444416/yVvaD7hU_400x400.jpg" name="Allsowp11" color="text-yellow-500" lesson="felsefe" time="20:23" date="01.01.2023"/>
                        <Lastthree photo="https://pbs.twimg.com/profile_images/1151410974240444416/yVvaD7hU_400x400.jpg" name="Allsowp11" color="text-green-500" lesson="Siyaset" time="20:23" date="01.01.2023"/>
                        <Lastthree photo="https://pbs.twimg.com/profile_images/1151410974240444416/yVvaD7hU_400x400.jpg" name="Allsowp11" color="text-blue-500" lesson="hukuk" time="20:23" date="01.01.2023"/>
                    </div>
                </div>
            </div>
       </Layout> 

    )
}