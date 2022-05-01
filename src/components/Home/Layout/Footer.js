import  { Social_Medias } from '../../../libs/SocialMedia'
export const Footer = (props) => {
    const Footer_links = (props) => {
        return(
            <a href={props.href} className="hover:underline hover:underline-offset-2">{props.title}</a>
        )

    }
    return(
        <div className="pt-10 inset-x-0 ">
            <div className={`px-20 flex justify-center ${props.bg} py-10`}>
                <div className=" justify-between flex flex-row space-x-10">
                    <div className="flex flex-col  space-y-3 items-center">
                        <h1 className="text-white">
                            Copyright 2022 All rights reserved Non-Official Company
                        </h1> 
                        <div className="flex flex-row space-x-2 text-white">
                            <Footer_links href="https://nonofficialcompany.com/" title="Anasayfa"/>
                            <Footer_links href="https://nonofficialcompany.com/#Biz" title="Biz kimiz?"/>
                            <Footer_links href="https://nonofficialcompany.com/Kurumsal/Sponsor" title="Sponsorluk"/>
                            <Footer_links href="https://nonofficialcompany.com/Kurumsal/Vizyon" title="Vizyon"/>
                            <Footer_links href="https://nonofficialcompany.com/Kurumsal/Misyon" title="Misyon"/>
                            <Footer_links href="https://nonofficialcompany.com/Kurumsal/Hisse" title="Hisse"/>
                            <Footer_links href="" title="Ekip"/>
                            <Footer_links href="" title="Paketler"/>
                        </div>
                        <div className="flex flex-row space-x-2 text-[#3b82f6] text-lg">
                            <Footer_links href="" title="Şartlar"/>
                            <Footer_links href="" title="Gizlilik"/>   
                            <Footer_links href="" title="Geri bildirim"/>  
                            <Footer_links href="" title="Yardım"/>
                        </div>                    
                    </div>
                    <div className='flex flex-row space-x-4 items-center'>
                        {Social_Medias.map((social ) => {
                            return(
                            <a href={social.href} target="_blank">
                                <social.image className={`text-3xl ${social.color}`}/>
                            </a>
                            
                            )
                            
                            })}
                    </div>
                </div>
            </div>
        </div>

    );
}