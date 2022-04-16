import { useContext, useEffect } from 'react';
import { VideoChatContext } from '../../../ContextVideoChat';

export const CallScreen = () => {
    const { Me, refreshMyVideoRef, myVideoRef, userVideoRef, callAccepted, call, answerCall, leaveCall } = useContext(VideoChatContext);

    useEffect(() => {
        refreshMyVideoRef();
    }, [])

    return (
        <div className='flex flex-col h-full items-center space-y-24'>
            <div className='flex flex-row pt-36 space-x-8'>
                <div className='flex flex-col items-center space-y-2'>
                    <div className='text-xl truncate'>[{Me.name}]</div>
                    <video ref={myVideoRef} autoPlay muted width="500"></video>
                </div>
                {callAccepted ? (
                    <div className='flex flex-col items-center space-y-2'>
                        <div className='text-xl truncate'>[{call.from.name ? call.from.name : "Name"}]</div>
                        <video ref={userVideoRef} autoPlay width="500"></video>
                    </div>
                ) : <></>}
            </div>
            {call.isReceivingCall && !callAccepted ? (<div className='flex flex-row items-center space-x-8 w-96'>
                <div className='text-xl truncate'>{call.from.name ? call.from.name : "No Name"} aramaya katılmak istiyor.</div>
                <button className='bg-[#19bc54] hover:bg-[#23fd71] px-4 py-2 text-xl text-white rounded-lg' onClick={answerCall}>Kabul Et</button>
                </div>) : (<></>)
            }
            <button className='bg-[#CB7178] hover:bg-[#ff8f97] h-12 w-2/6 text-xl text-white rounded-lg' onClick={leaveCall}>Aramadan Ayrıl</button>
        </div>
    )
}