import {
    AiOutlineMessage


} from "react-icons/ai"
export const StudentTest = () => {
    const Teacherlist = [
        {
            name: "Ayça erdurmuş",
            href: "https://conteudo.imguol.com.br/c/entretenimento/9e/2020/06/16/valorant-jett-1592318370403_v2_1x1.jpg"
        },
        {
            name: "veli bayram",
            href: "https://conteudo.imguol.com.br/c/entretenimento/9e/2020/06/16/valorant-jett-1592318370403_v2_1x1.jpg"
        },
        {
            name: "abdulap el-mulap",
            href: "https://conteudo.imguol.com.br/c/entretenimento/9e/2020/06/16/valorant-jett-1592318370403_v2_1x1.jpg"
        },
        {
            name: "Recep Tayyip Erdoğan",
            href: "https://conteudo.imguol.com.br/c/entretenimento/9e/2020/06/16/valorant-jett-1592318370403_v2_1x1.jpg"
        },
    ]
    return (
        <div className="w-screen h-screen flex">
            <div className="w-3/12  bg-[#151822] py-4 px-3 flex flex-col space-y-2 ">
                <h1 className="text-center text-[#444d6e] text-3xl">Teachers</h1>
                <div className="flex flex-col space-y-4">
                    {Teacherlist.map(teacher =>(
                        <div className="flex flex-row space-x-3 text-[#444d6e]">
                            <div className="flex flex-row space-x-5">
                                <img className="rounded-full h-10 " src={teacher.href} alt="" />
                                <h1 className="flex items-center">{teacher.name}</h1>

                            </div>
                            <button className="bg-green-200"><AiOutlineMessage size={30} fill="#444d6e"/></button>
                        </div>
                    ))}
                </div>
            </div>
            <div className="w-9/12 flex  items-center  justify-center ">    
                <div className="h-80 w-96 block border-2 rounded-2xl bg-[#5167a6] border-[#5167a6]">
                    
                </div>
            </div>


        </div>
    );
};
