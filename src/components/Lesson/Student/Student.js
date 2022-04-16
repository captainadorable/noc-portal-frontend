import { useContext, useEffect, useState } from 'react';
import { CallScreen } from '../CallScreen/CallScreen';
import { VideoChatContext } from '../../../ContextVideoChat';
export const Student = () => {
    const { myVideoRef, callUser, callWaiting, callAccepted, call, Me } = useContext(VideoChatContext)

    const [waitingCalls, setWaitingCalls] = useState([]);

    const CallHandler = (event) => {
        event.preventDefault()

        const id = event.target.id
        callUser(id)
    }

    const CannotCallHandler = (event) => {
        event.preventDefault();
        
        console.log("Cant call room is full.")
    }

    useEffect(async () => {
        const data = await fetch(`${process.env.REACT_APP_SERVER_IP}/api/getWaitingCalls`).then(res => res.json())
        setWaitingCalls(exdata => data.waitingCalls)
    }, [])

    useEffect(() => {
        const timer = setInterval(async () => {
            const data = await fetch(`${process.env.REACT_APP_SERVER_IP}/api/getWaitingCalls`).then(res => res.json())
            setWaitingCalls(exdata => data.waitingCalls)
        }, 1000)
        return () => clearInterval(timer);
    }, [])


    if (callWaiting && !callAccepted) {
        return (
            <div>Waiting</div>
        )
    }
    if (callAccepted && call) {
        return (
            <CallScreen />
        )
    }
    else {
        return (
            <div className='flex flex-col items-center pt-24 space-y-8'>
                <div className='flex flex-col items-center space-y-8'>
                    <div className='text-4xl'>
                        {Me.name}
                    </div>
                    <video ref={myVideoRef} autoPlay muted width="500"></video>
                </div>
                <div className='flex flex-row space-x-4 pt-12'>
                    {waitingCalls.map(call => (
                        <form onSubmit={call.users.length === 2 ? CannotCallHandler : CallHandler} key={call.initiator.id} id={call.initiator.id} className="flex flex-col items-center space-y-4 bg-blue-300 text-white w-48 pt-4 shadow-xl rounded-lg">
                            <div className='text-lg w-36 text-center truncate'>{call.initiator.name}</div>
                            <div>Ders: {call.lesson}</div>
                            <div>{call.users.length}/2</div>
                            <div className='pb-4'>
                                <button className='bg-white shadow text-black w-24 px-4 py-2' {...call.users.length === 2 ? "disabled" : ""}>Katıl</button>
                            </div>
                        </form>
                    ))}
                </div>
            </div>
        )
    }
};