import { IoCheckmarkSharp } from 'react-icons/io5'
import '../styles/components.css'
import { IHoldingHdr } from './holdings'
import { parseAmount } from '../utils/functions'

export interface IHoldingCard extends IHoldingHdr {
    id: number ,
    asset: string,
    img: string,
    symbol: string,
    holdings: number,
    totalCurrentValue: number,
    shortTerm: number,
    shortTermResult: number,
    longTerm: number,
    longTermResult: number,
    amountToSell: number | string,
    averageBuyPrice: number
}

export function HoldingCard ({ 
    id, 
    selectedAll, 
    selected, 
    toggleSelection,
    img,
    asset,
    symbol,
    holdings,
    totalCurrentValue,
    shortTerm,
    shortTermResult,
    longTerm,
    longTermResult,
    amountToSell,
    averageBuyPrice
}: IHoldingCard) {
    
    function handleClass () {
        return selectedAll || selected.includes(id) ? 'toggle-select-active' : 'toggle-select'
    }

    function handleChecked () {
        return selectedAll || selected.includes(id) ? <IoCheckmarkSharp /> : ''
    }

    function handleShortTerm () {
        if (shortTerm < 0) {
            let res = shortTerm.toString()
            let resArr = res.split('')

            let value = `-$${resArr.slice(1, resArr.length).join('')}`

            return value;
        }
        return parseAmount(shortTerm);
    }

    function handleClick () {
        let _id:number = id;

        //@ts-ignore
        toggleSelection(_id)
    }

    // if (id == 1) {
    //     console.log(selectedAll)
    //     console.log(selected.includes(id))
    // }

    return (
        <div className='holdings-card'>
            <div className='holding-card-asset'>
                <div> <img src={img} alt={symbol} /> </div>

                <div className='holding-card-asset-info'>
                    <span>{asset}</span>
                    <span>{symbol}</span>
                </div>

            </div>
            
            <div className='asset-details'>
                <span>{parseAmount(holdings)} {symbol}</span>
                <span>{parseAmount(averageBuyPrice)} {symbol}</span>
            </div>

            <div>{totalCurrentValue}</div>
            
            <div className='asset-details'>
                <span>{handleShortTerm()}</span>
                <span>{parseAmount(shortTermResult)} {symbol}</span>
            </div>
            
            <div className='asset-details'>
                <span>${longTerm}</span>
                <span>{longTermResult} {symbol}</span>
            </div>
            
            <div>{amountToSell || '-'}</div>

            <span className={handleClass()} onClick={handleClick}>
                {
                   handleChecked()
                }
            </span>
        </div>
    )
}