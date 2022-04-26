import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PomodoroContext } from '../../../ContextPomodoro';
import { SessionContext } from "../../../index";
import { PeerCard } from './PeerCard';

export const Room = () => {
    const { peers, Me } = useContext(PomodoroContext);
    const { roomId } = useParams()

    useEffect(() => {
        console.log(peers);
    }, [peers]);

    const { session } = useContext(SessionContext);
    if (session === null) return window.location.href = "/login";
    return (
        <div className="flex flex-col items-center pb-36 h-1/2 pt-36">
            <div className="flex flex-col space-y-8 items-center">
                <div className='text-6xl'>Pomodoro</div>
                <div className='text-3xl'>{roomId}</div>
            </div>
            <div className={`grid ${peers.length + 1 > 4 ? "grid-cols-4" : "grid-flow-col"} grid-flow-row place-items-center gap-2 place-content-center pt-12`}>
                <div className="flex flex-col items-center space-y-4 w-36 h-48 ">
                    <img src={Me.pp} alt="userpp" className="rounded-full"/>
                    <div className="text-xl">{Me.name}</div>
                </div>
                
                
                {peers.map((peer) => (
                    <PeerCard key={peer.user.id} peer={peer} />
                ))}
            </div>
            <button className='bg-[#CB7178] hover:bg-[#ff8f97] h-12 w-2/6 text-xl text-white rounded-lg w-96' onClick={() => window.location.replace("/pomodoro")}>Odadan Ayrıl</button>
        </div>
    );

};
