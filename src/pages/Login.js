import { Layout } from "../components/Home/Layout";
import { GoogleLogin } from 'react-google-login'
import axios from 'axios'

export const Login = () => {
    const handleLogin = async googleData => {
        const data = await axios.post(`${process.env.REACT_APP_SERVER_IP}/api/v1/auth/google`, { token: googleData.tokenId }, { withCredentials: true })
        console.log(googleData)
        if (data.data.error) return
        else return window.location.href = "/profile";
    };

    return(
        <Layout>
            <div className=" grid place-items-center space-y-8 h-screen">
                <div className="flex flex-col items-center space-y-10">
                    <div className="text-4xl text-[#3b82f6]">Giriş Yap</div>
                    <GoogleLogin 
                        clientId={process.env.REACT_APP_GOOGLE_CLIENT} //procces.env.GOOGLE_CLIENT_ID
                        buttonText="Google ile giriş yap"
                        onSuccess={handleLogin}
                        onFailure={handleLogin}
                        cookiePolicy={'single_host_origin'}
                    />
                    </div>
            </div>
        </Layout>
    );
}