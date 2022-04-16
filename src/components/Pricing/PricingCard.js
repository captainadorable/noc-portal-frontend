export const PricingCard = ({CardName, CardColor, CardPrice}) => {
   
    const DetailsComponent = ({details}) => {
        return (
            <div className="flex flex-row items-center space-x-2">
                    <img className="self-start " src="images/tick.svg" width="28" alt="tick"></img>
                    <div>{details}</div>
            </div>
        )
    }

    return (
        <div className={`flex flex-col items-center ${CardColor} lg:w-1/5 lg:h-[6-rem] shadow-xl rounded-2xl overflow-visible`}>
            <div>
                <div className="text-4xl text-center pt-12 w-64 pb-4">{CardName}</div>
                <hr />
            </div>
            <div className="flex flex-row items-center space-x-2 pt-8">
                <img src="https://upload.wikimedia.org/wikipedia/commons/a/af/Turkish_lira_symbol_black.svg" width="16" height="16" className="self-start pt-2" alt="sembol"></img>
                <div className="text-6xl lg:text-8xl text-blue-300">{CardPrice}</div>
                <div className="text-xl lg:text-3xl self-end pb-4">/ay</div>
            </div>
            <div className="text-xl px-20 pt-8 pb-6 space-y-4">
                <DetailsComponent details="Lorem ipsum dolor sit amet, consectetur."/>
                <DetailsComponent details="Lorem ipsum dolor sit."/>
                <DetailsComponent details="Sed scelerisque magna sit amet fedivs auctor dignissim."/>
            </div>
            <div className="pb-12">
                <button class="bg-[#5065a5] text-white py-2 px-8 border border-blue-300 rounded-xl text-2xl">
                    Satın al
                </button>
            </div>
        </div>
        
    )
}
