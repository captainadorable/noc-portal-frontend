import { Room } from '../components/Pomodoro/Room/Room'
import { Layout } from "../components/Home/Layout";
import { ContextProvider } from "../ContextPomodoro";

export const PomodoroRoom = () =>{
    return(
        <ContextProvider>
            <Layout>
                <Room />
            </Layout>
        </ContextProvider>
    );
}