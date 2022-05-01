import { Teacher } from "../components/Home/Teacher/Teacher"
import { Student } from "../components/Home/Student/Student"
import { Anonymous } from "../components/Home/Anonymous/Anonymous"
import { SessionContext } from ".."
import { useContext } from "react"


export const Home = () => {
    const { session } = useContext(SessionContext)
    if(session?.permission === "teacher"){
        return(
            <Teacher session={session}/>
        )
    }
    else if(session?.permission === "student"){
        return(
            <Student session={session}/>  
        )
    }
    else {
        return(
            <Anonymous />
        )
    }
}