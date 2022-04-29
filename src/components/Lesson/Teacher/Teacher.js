import { useContext } from 'react';
import { VideoChatContext } from '../../../ContextVideoChat';
import { Layout } from '../../Home/Layout';
import { Call } from '../Call/Call';


export const Teacher = () => {
    const { createCall, myVideoRef, call } = useContext(VideoChatContext);

    const handleForm = (event) => {
        event.preventDefault();
        const lesson = event.target.elements.lesson.value

        if (lesson === "" ) return 

        createCall(lesson.slice(0, 36));
    }
    if (call.active) return <Call></Call>
    else return (
        <Layout>
            <div className="flex flex-col items-center justify-center space-y-16">
                <div>Öğretmen</div>
                <video ref={myVideoRef} autoPlay muted className='h-80 w-96'></video>
                <form onSubmit={handleForm} className="flex flex-col space-y-4">
                    <input name="lesson" type="text" placeholder="Yapılacak ders" className="border-2 shadow p-2" />
                    <button className="bg-blue-300 text-white p-4 rounded-lg">Arama Oluştur</button>
                </form>
            </div>
        </Layout>
    )
};