import '../styles/components.css'
import { parseAmountToTwo } from '../utils/functions'

interface IHarvestCard {
    type: "pre" | "post",
    shortTermProfit: number,
    shortTermLoss: number,
    longTermProfit: number,
    longTermLoss: number
}


export default function HarvestCard ({
    type, 
    shortTermProfit,
    shortTermLoss,
    longTermProfit,
    longTermLoss
}: IHarvestCard) {
    

    function handleCardType (){
        return type == "pre" ? "Pre Harvesting" : "After Harvesting"
    }

    function handleResultType () {
        return type == "pre" ? "Realised Capital Gains: " : "Effective Capital Gains: " 
    }

    function handleResult ():number {
        return shortTermProfit - shortTermLoss;
    }


    return (
        <div className={type == 'pre' ? 'harvest-card': 'harvest-card post-harvest-card'}>
            <span className='harvest-card-title'>{ handleCardType() }</span>

            <div className='harvest-card-content'>
                <span className='harvest-card-content-hdr'></span>
                <span>Short-term</span>
                <span>Long-term</span>

                <span className='harvest-card-content-hdr'>Profit</span>
                <span>${parseAmountToTwo(shortTermProfit)}</span>
                <span>${longTermProfit}</span>

                <span className='harvest-card-content-hdr'>Losses</span>
                <span>-${parseAmountToTwo(shortTermLoss)}</span>
                <span>-${longTermLoss}</span>

                <span className='harvest-card-content-hdr'>Net Capital Gains</span>
                <span>${parseAmountToTwo(shortTermProfit - shortTermLoss)}</span>
                <span>${longTermProfit - longTermLoss}</span>
            </div>

            <div className='harvest-card-result'>
                <span>{ handleResultType() }</span>
                <span>${ parseAmountToTwo(handleResult()) }</span>
            </div>


            {
                type == 'post'
                ?
                <div className='safe-text'>
                    🎉 Your taxable capital gains are reduced by:
                </div>
                :
                ''
            }
        </div>
    )
}