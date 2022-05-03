import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const Layout = (props) => {
    return (
        <div className="bg-[#344591]">
            <ToastContainer />
            <Navbar />
                {props.children} 
            <Footer bg="bg-[#344591]"/>
        </div>
    )
};