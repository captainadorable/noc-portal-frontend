import { useEffect, useState } from 'react';
import { RoomCard } from './RoomCard';

export const RoomList = () => {
    const [pomodoroRooms, setPomodoroRooms] = useState([]);

    const getResponse = async () => {
        const data = await fetch(`${process.env.REACT_APP_SERVER_IP}/api/getPomodoroRooms`).then((res) => res.json());
        setPomodoroRooms((exPomodoro) => data);
    };

    useEffect(() => {
        const timer = setInterval(() => {
            getResponse();
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="flex flex-col items-center pt-12">
            <div className="text-4xl text-[#4f64a6]">Odalar</div>
            <div className="grid grid-cols-5  pt-12 gap-x-4 gap-y-8">
                {pomodoroRooms.map((room) => (
                    <div key={room.roomId}>
                        <RoomCard Room={room} />
                    </div>
                ))}
            </div>
        </div>
    );
};
