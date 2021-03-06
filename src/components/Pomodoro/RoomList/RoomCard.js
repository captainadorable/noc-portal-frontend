export const RoomCard = ({ Room }) => {
    
    return (
        <div className="flex flex-col items-center justify-between space-y-4 bg-blue-200 py-4 h-36 w-48 text-white rounded-2xl shadow">
            <div className="text-xl">{Room.name}</div>
            <div className="text-lg">{Room.users.length}/20</div>
            <div className="flex flex-row space-x-[2px]">
                <img src="/images/avatar.svg" alt="User PP" width="15"/>
                <img src="/images/avatar.svg" alt="User PP" width="15"/>
                <img src="/images/avatar.svg" alt="User PP" width="15"/>
            </div>
            <button onClick={() => window.location.href = "/pomodoro/"+ Room.id} className="bg-white text-black w-24 h-8 rounded-2xl shadow">Odaya Gir</button>
        </div>
    )
};