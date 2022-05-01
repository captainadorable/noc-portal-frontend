import { Layout } from "../Layout"
export const Anonymous = () => {
    const Text = [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit. ",
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?",
    ]
    return(
       <Layout >
            <div className="pt-52 flex flex-col space-y-20 h-full">
                <div className="px-32 flex items-center flex-col space-y-20 justify-center">
                    <h1 className="text-4xl text-white ">Portala Hoş Geldiniz</h1>
                    <div className="flex flex-col space-y-32">
                        <div className="flex flex-row w-full space-x-12">
                            <div className="flex flex-col space-y-10 w-4/6 justify-center text-white ">
                                <h1 className="text-2xl border-l-4 hover:border-l-8 hover:border-[#3b82f6] pl-4">
                                    <p className="text-shadow">
                                        {Text[0]}
                                    </p>
                                </h1>
                                <div className="flex flex-col space-y-5 text-lg">
                                    <p className="">
                                        {Text[1]}
                                    </p>
                                    <p className=" ">
                                        {Text[2]}
                                    </p>
                                </div>
                            </div>
                            <div className="w-2/6">
                                <img src="/images/pomodoro_exp.png" alt="" className="bg-[#3b82f6] rounded-full"/>
                            </div>
                        </div>
                        <div className="flex flex-col w-full space-y-10 text-white">
                            <div className="flex flex-col space-y-12 ">
                                <h1 className=" text-2xl border-l-4 hover:border-l-8 hover:border-[#3b82f6] pl-4">
                                    {Text[1]}
                                </h1>
                                <div className="flex justify-center">
                                    <img src="/images/p2p_exp.png" alt="" className="bg-[#3b82f6] rounded-xl p-4"/>
                                </div>
                                <p className="text-lg ">
                                    {Text[3]}
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col space-y-8">
                            <h1 className="text-center text-white text-4xl">
                                Nasıl kullanılır
                            </h1>
                            <div className="flex flex-col space-y-4">
                                <div className="flex flex-col ">

                                </div>
                            </div>
                        </div>
                    </div>
                </div>  
            </div>
       </Layout> 

    )
}