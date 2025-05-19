import '../styles/components.css'

interface IHarvestCard {
    type: "pre" | "post",
    shortTermProfit: number,
    shortTermLoss: number,
    shortTermNetCapitalGains: number,
    longTermProfit: number,
    longTermLoss: number,
    longTermNetCapitalGains: number,
    realisedCapitalGains?: number,
    effectiveCapitalGains?: number
}


export default function HarvestCard ({
    type, 
    shortTermProfit,
    shortTermLoss,
    shortTermNetCapitalGains,
    longTermProfit,
    longTermLoss,
    longTermNetCapitalGains,
    realisedCapitalGains,
    effectiveCapitalGains
}: IHarvestCard) {
    
    function handleCardType (){
        return type == "pre" ? "Pre Harvesting" : "After Harvesting"
    }

    function handleResultType () {
        return type == "pre" ? "Realised Capital Gains: " : "Effective Capital Gains: " 
    }

    function handleResult ():number {
        if (type == 'pre') {

        } else {}
        
        return 0;
    }

    return (
        <div className={type == 'pre' ? 'harvest-card': 'harvest-card post-harvest-card'}>
            <span className='harvest-card-title'>{ handleCardType() }</span>

            <div className='harvest-card-content'>
                <span className='harvest-card-content-hdr'></span>
                <span>Short-term</span>
                <span>Long-term</span>

                <span className='harvest-card-content-hdr'>Profit</span>
                <span>${shortTermProfit}</span>
                <span>${longTermProfit}</span>

                <span className='harvest-card-content-hdr'>Losses</span>
                <span>-${shortTermLoss}</span>
                <span>-${longTermLoss}</span>

                <span className='harvest-card-content-hdr'>Net Capital Gains</span>
                <span>${shortTermProfit - shortTermLoss}</span>
                <span>${longTermProfit - longTermLoss}</span>
            </div>

            <div className='harvest-card-result'>
                <span>{ handleResultType() }</span>
                <span>${ handleResult() }</span>
            </div>
        </div>
    )
}