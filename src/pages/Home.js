import { Layout } from "../components/Home/Layout";
import { Hero } from "../components/Home/Hero/index"
import { Hero1 } from "../components/Home/Hero/index1"

export const Home = () => {
    return(
        <Layout>
            <Hero/>
            <Hero1/>
        </Layout>
    );
}