import { useEffect, useRef } from "react";

export const PeerCard = ({ peer }) => {
    const ref = useRef()

    useEffect(() => {
        peer.peer.on("stream", stream => {
            ref.current.srcObject = stream;
        });
    });

    return (
        <div className="flex flex-col items-center space-y-4 w-36 h-48">
            <img src={peer.user.pp} alt="userpp" className="rounded-full"/>
            <div className="text-xl">{peer.user.name}</div>
            <div className="text-lg">{peer.user.permission === "student" ? "(Öğrenci)" : "(Öğretmen)"}</div>
            <audio ref={ref} autoPlay playsInline></audio>
        </div>
    );
};
