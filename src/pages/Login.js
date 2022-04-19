import { Layout } from "../components/Home/Layout";
import { GoogleLogin } from 'react-google-login'
import axios from 'axios'

export const Login = () => {
    const handleLogin = async googleData => {
        const data = await axios.post(`${process.env.REACT_APP_SERVER_IP}/api/v1/auth/google`, { token: googleData.tokenId }, { withCredentials: true })
        console.log(googleData)
        if (data.data.error) return
        else return window.location.replace("/");
    };

    return(
        <Layout>
            <div className="flex flex-col items-center pt-48 space-y-8">
                <div className="text-4xl">Giriş Yap</div>
                <GoogleLogin 
                    clientId={"252935734878-ul0dp54lrnm1djg9n81o1l2s2dceov4v.apps.googleusercontent.com"} //procces.env.GOOGLE_CLIENT_ID
                    buttonText="Google ile giriş yap"
                    onSuccess={handleLogin}
                    onFailure={handleLogin}
                    cookiePolicy={'single_host_origin'}
                />
            </div>
        </Layout>
    );
}