const texts = ["Hocalar İle Birebir Çevrimiçi Özel Ders","Öğrencinin ihtiyacına yönelik karar verdiği dersi, alanında uzman hocalar ile çevrimiçi birebir dersler yardımıyla almasını sağlar.","Bu sayede öğrenci konu eksiğini giderebilir ve akademik başarısını artırabilir."]
const tickedwords = (text) => {
    return(
        <div className="flex space-x-4 items-center">
            <img  src="/images/tick.svg" alt="tick_images" />
            {text}
        </div>
    );
}
export const Hero = () => {
    return (
        <div className="bg-[#f7eee5] h-screen w-full px-32 justify-center pt-72 flex space-x-10 ">
            <div className="w-2/6">
                <img src="/images/hero1_avatar.svg" alt="Avatar1_hero" />
            </div>  
            <div className="w-4/6">
                <div className="flex flex-col space-y-16">
                    <h1 className="text-3xl text-bold">
                        {texts[0]}
                    </h1>
                    <div className="flex flex-col space-y-5">
                        <h1 className="text-2xl text-bold">     
                            {tickedwords(texts[1])}
    
                        </h1>
                        <h1 className="text-2xl text-bold">
                            {tickedwords(texts[2])}
                        </h1>  
                    </div>

                
                </div>

            </div>
        </div>
    )
};