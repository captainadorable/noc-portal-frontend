const texts = ["Yaşıtları İle Pomodoro İmkanı","Pomodoro Tekniği, bir zaman yönetimi yöntemidir. Teknikte, iş geleneksel olarak 25 dakika uzunluğunda, kısa molalarla ayrılır. Bunun içinse zamanlayıcı kullanılır. ","Kısa molalarda ise öğrenciler birbirleri ile hoş bir sohbet imkanı bulurlar ve akran öğrenmesi sağlanır."]
export const Hero1 = () => {
    return (
    <div className="h-screen w-full px-32 justify-center items-center flex space-x-10 ">
        <div className="w-4/6">
            <div className="flex flex-col space-y-16">
                <h1 className="text-3xl text-bold">
                    {texts[0]}
                </h1>
                <div className="flex flex-col space-y-5">
                    <h1 className="text-2xl text-bold">     
                        {texts[1]}

                    </h1>
                    <h1 className="text-2xl text-bold">
                        {texts[2]}
                    </h1>  
                </div>
            </div>
        </div>
        <div className="w-2/6">
            <img src="/images/hero2_avatar.svg" alt="Avatar2_hero" />
        </div>  
    </div>
    )
};