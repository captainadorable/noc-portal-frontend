import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export const Layout = (props) => {
    return (
        <div className="bg-[#344591]">
            <Navbar />
                {props.children} 
            <Footer bg="bg-[#344591]"/>
        </div>
    )
};