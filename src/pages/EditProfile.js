import { Layout } from '../components/Home/Layout';
import { useContext } from 'react';
import { SessionContext } from '../index';
import axios from 'axios';
import { toast } from 'react-toastify';

export const EditProfile = () => {
    const { session } = useContext(SessionContext);

    if (session == null) {
        window.location.replace('/login');
        return;
    }

    const handleForm = async (event) => {
        event.preventDefault();

        const username = event.target.elements.username.value.slice(0, 64)
        const profilebio = event.target.elements.profilebio.value.slice(0, 128)

        if (username === "" || username.length < 8) {
            toast.error('Kulanıcı adı 8 karakterden küçük olamaz.', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return
        }
        if (!username.match(/^[a-zA-Z\-]+$/)) {
            toast.error('Kullanıcı adı uygun değil!', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return
        }

        const data = {
            changes: {
                username: { value: username },
                profileBio: { value: profilebio }
            } 
        }

        await axios.post(process.env.REACT_APP_SERVER_IP + "/updateMyProfile", data, { withCredentials: true }).then((res) => {
            if (res.data.error) {
                toast.error('Profil güncellenirken bir hata oluştu! Lütfen tekrar dene.', {
                        position: "bottom-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                return
            }
            else {
                window.location.replace("/profile")
            }
        })
    };
    
    return (
        <Layout>
            <div className="flex flex-col space-y-24 items-center pt-32 px-20 ">
                <form onSubmit={handleForm} className="flex flex-col items-center space-y-8 text-black">
                    <input type="text" defaultValue={session.username} name="username" className='text-black'/>
                    <textarea defaultValue={session.profileBio} name="profilebio" />
                    <button>Update profile</button>
                </form>
            </div>
        </Layout>
    );
};
