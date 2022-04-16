export const Introduction = () => {
    const texts = ["Pomodoro Tekniği, 1980'lerin sonunda Francesco Cirillo tarafından geliştirilen bir zaman yönetimi yöntemidir. Teknikte, iş geleneksel olarak 25 dakika uzunluğunda, kısa molalarla ayrılır. Bunun içinse zamanlayıcı kullanılır. Her aralık, Cirillo'nun üniversite öğrencisiyken kullandığı domates şeklindeki mutfak zamanlayıcısından sonra, İtalyanca 'domates' kelimesinden bir pomodoro olarak ifade edilir."]

    return (
        <div className="flex flex-col items-center ">
            <div className="flex flex-col space-y-8 items-center justify-between pt-16 px-96">
                <div className="text-4xl text-[#4f64a6]">Pomodoro Nedir?</div>
                <div className="text-xl text-center">{texts[0]}</div>
            </div>
            <div className="flex flex-col space-y-12 items-center justify-between pt-16 px-90">
                <div className="text-4xl text-[#4f64a6]">İşleyiş</div>
                <div className="flex flex-row items-center space-x-8 text-xl">
                    <div className="font-bold">25 dakika boyunca tek bir göreve odaklanmak</div>
                    <img src="/images/arrow.svg" alt="Arrow" width="60" style={{"transform": "rotate(90deg)"}}/>
                    <div className="font-bold ">5 dakikalık ara vermek</div>
                    <img src="/images/arrow.svg" alt="Arrow" width="60" style={{"transform": "rotate(90deg)"}}/>
                    <div className="font-bold"> 1 adet Pomodoro</div>
                </div>
                <div className="text-xl text-blue-200">4 Pomodoro sonunda 30 dakika mola</div>
            </div>
        </div>
        
    )
};