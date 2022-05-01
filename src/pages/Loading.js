import { Loading } from "../SvgComponents/loading"
import { Loading2 } from "../SvgComponents/loading2"
import { useEffect } from "react"
export const LoadingPage = () => {

    useEffect(() => {
      setTimeout(() => {
        window.location.replace("/home")

      }, 2000)
    }, [])

    return(
        <div className="grid place-items-center h-screen bg-[#181e2b]">
            <div className="text-[#5063a8] flex flex-col space-y-8">
                <h1 className="text-6xl text-[#7490f4] text-center">Portal hazır</h1>
                <div className="flex justify-center">
                    <Loading size="300px"/>
                </div>
                <div className="flex flex-row space-x-1 justify-center items-center">  
                    <h1 className="text-2xl">lütfen bekleyiniz</h1>
                    <div className="flex item-center justify-center pt-4 ">
                         <Loading2 /> 
                    </div>    
               </div>
            </div>

        </div>
    )

}