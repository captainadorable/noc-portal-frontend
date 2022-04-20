import { useContext } from "react";
import { Layout } from "../components/Home/Layout";
import { Student } from "../components/Lesson/Student/Student";
import { Teacher } from "../components/Lesson/Teacher/Teacher";
import { Navigate } from "react-router-dom";

import { ContextProvider } from "../ContextVideoChat";
import { SessionContext } from "..";
export const Lesson = () =>{
    const { session } = useContext(SessionContext);

    if (session === null) return <Navigate to="/login"/>
    return(
        <ContextProvider>
            <Layout>
                <div className="w-screen flex items-center justify-center">
                    {session.permission === "student" ? (<Student />) : (<Teacher />)}
                </div>
            </Layout>
        </ContextProvider>
    );
}