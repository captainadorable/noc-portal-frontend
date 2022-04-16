import { Layout } from '../components/Home/Layout';
import { PricingCard } from '../components/Pricing/PricingCard';
export const Pricing = () => {
    return (
        <Layout>
            <div className="pt-24 flex flex-col items-center space-y-16">
                <div className="text-4xl lg:text-6xl" id="pricing">
                    Paketler
                </div>

                <div className="flex flex-col space-y-10 px-4 lg:space-y-0 lg:flex-row justify-center lg:space-x-8">
                    <PricingCard CardName="Beleş" CardColor="bg-yellow-200" CardPrice="24" />
                    <PricingCard CardName="Pahalı" CardColor="bg-yellow-100" CardPrice="31" />
                    <PricingCard CardName="Ucube" CardColor="bg-yellow-300" CardPrice="67" />
                </div>
            </div>
        </Layout>
    );
};
