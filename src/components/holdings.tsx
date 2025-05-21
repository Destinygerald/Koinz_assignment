import { useEffect, useState } from 'react';
import { GoDash } from 'react-icons/go';
import { fetchTokens, IResponse } from '../api/fetchData';
import { HoldingCard } from './holdingsCard';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import '../App.css'
import { addAllToken, addToken, clearTokens, removeToken } from '../redux/features/selectedTokens';

export interface IHoldingHdr {
    selectedAll: boolean,
    selected: number[],
    toggleSelect?: () => void,
    toggleSelection?: (arg: number) => void
}

function HoldingdHdr ({ selectedAll, toggleSelect, selected }: IHoldingHdr) {

    function handleChecked () {
        return selectedAll && selected.length == 25 ? <GoDash /> : ''
    }

    function handleStyliny () {
        return selectedAll && selected.length == 25 ? 'toggle-select-active' : 'toggle-select'
    }

    return (
        <div className='holdings-header'>
            <div>Assets</div>
            
            <div className='market-rate'>
                <span>Holdings</span>
                <span>Current Market Rate</span>
            </div>

            <div>Total Current Value</div>
            <div>Short-Term</div>
            <div>Long-Term</div>
            <div>Amount to Sell</div>

            <span className={handleStyliny()} onClick={toggleSelect}>
                {
                    handleChecked()
                }
            </span>
        </div>
    )
}


export function Holdings () {
    
    const [ more, setMore ] = useState<boolean>(false);
    const [ selectedAll, setSelectedAll ] = useState<boolean>(false);

    
    const selected = useAppSelector(state => state.selectedTokens.value)
    const tokens = useAppSelector(state => state.availableTokens.value)
    
    const dispatch = useAppDispatch()

    function toggleSelect () {

        if (!selectedAll) {
            let allToken: number[] = [];
            
            tokens.forEach(token => {
                // @ts-ignore
                allToken.push(token.id)    
            })
            
            setSelectedAll(true)
            dispatch(addAllToken(allToken))

        } else {
            setSelectedAll(false)
            dispatch(clearTokens())
        }
    }

    function toggleMore () {
        setMore(!more)
    }

    function toggleSelection (id: number) {
        if (selected.includes(id)) {
            dispatch(removeToken(id))
            setSelectedAll(false)
        } else {
            dispatch(addToken(id))
        }
    }

    function displayHandler () {
        let response: any[];

        if (more) {
            response = [...tokens]
        } else {
            response = tokens.slice(0, 2)
        }

        return (
            response.map(token =>  (
                <HoldingCard 
                    id={token.id}
                    key={token.id}
                    selectedAll={selectedAll} 
                    selected={selected} 
                    toggleSelection={toggleSelection}
                    img={token.logo}
                    asset={token.coinName}
                    symbol={token.coin}
                    holdings={token.totalHolding}
                    totalCurrentValue={token.currentPrice}
                    shortTerm={token.stcg.balance}
                    shortTermResult={token.stcg.gain}
                    longTerm={token.ltcg.balance}
                    longTermResult={token.ltcg.gain}
                    amountToSell={token.amountToSell}
                    averageBuyPrice={token.averageBuyPrice}
                />
            ))
        )
    }

    return (
        <div className='holdings-container'>
            <div className='holdings'>
                <span>Holdings</span>

                <HoldingdHdr selected={selected} selectedAll={selectedAll} toggleSelect={toggleSelect} />

                <div className='holdings-carousel'>
                    <div className='holdings-carousel-inner'>
                        { displayHandler() }
                    </div>
                </div>

                <span className='view-all' onClick={toggleMore}>View { more ? "Less" : "All"}?</span>
            </div>
        </div>
    )
}