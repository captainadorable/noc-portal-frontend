import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export const Layout = ({ children }) => {
    return (
        <div>
            <Navbar />
            {children}
            <div  className="pt-24">
                <Footer/>
            </div>
        </div>
    )
};