
export const Page404 = () => {
    return (
        <div className="grid place-items-center h-screen bg-[#181e2b]">
            <div className="text-white flex flex-row space-x-10">
                    <h1 className="text-8xl text-[#7490f4] ">404</h1>
                <div className="flex flex-col space-y-4 justify-center">
                    <div className="flex flex-col space-y-2">
                        <h1 className="text-3xl">Üzgünüz!</h1>
                        <p className="text-xl">aradığınız sayfayı bulamadık</p>
                    </div>
                    <a href="/home">
                        <div className="flex-row flex space-x-2">
                            <img src="/images/arrow.svg" alt="" style={{ transform: 'rotate(-90deg)' }} />
                            <h1 className="flex items-center text-[#7490f4]">Anasayfa</h1>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    );
};
