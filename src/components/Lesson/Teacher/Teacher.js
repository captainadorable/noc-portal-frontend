import { useContext } from 'react';
import { CallScreen } from '../CallScreen/CallScreen';
import { VideoChatContext } from '../../../ContextVideoChat';

export const Teacher = () => {
    const { setLesson, waitForCall, state, myVideoRef } = useContext(VideoChatContext);

    const HandleCreateRoom = (event) => {
        event.preventDefault();

        const lesson = event.target.elements.lesson.value;
        
        if (lesson === "") return;

        waitForCall();
    };

    const HandleLessonChange = (event) => {
        event.preventDefault();

        const lesson = event.target.value;

        if (!lesson) return;

        setLesson(lesson);
    };

    if (state === 'waitingCall') {
        return <CallScreen />;
    }

    return (
        <div className="flex flex-col items-center pt-24 space-y-8 w-1/2">
            <video ref={myVideoRef} autoPlay muted width="500"></video>
            <form className="flex flex-col items-center w-3/4 space-y-4" onSubmit={HandleCreateRoom}>
                <input
                    name="lesson"
                    type="text"
                    placeholder="Yapılacak Ders"
                    className="w-4/6 p-2"
                    onChange={HandleLessonChange}
                />
                <button className="bg-blue-200 text-white px-4 py-2 rounded-lg text-xl hover:bg-blue-300">
                    Oda oluştur
                </button>
            </form>
        </div>
    );
};
