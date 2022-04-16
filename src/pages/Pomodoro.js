import { Layout } from "../components/Home/Layout";
import { Introduction } from "../components/Pomodoro/Introduction/Introduction";
import { RoomList } from "../components/Pomodoro/RoomList/RoomList";

export const Pomodoro = () =>{
    return(
        <Layout>
            <Introduction />        
            <RoomList />
        </Layout>
    );
}