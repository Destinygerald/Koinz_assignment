import { useEffect, useState } from 'react';
import { GoDash } from 'react-icons/go';
import { fetchTokens, IResponse } from '../api/fetchData';
import { HoldingCard, IHoldingCard } from './holdingsCard';
import '../App.css'

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
    const [ selected, setSelected ] = useState<number[]>([])
    const [ selectedAll, setSelectedAll ] = useState<boolean>(false);

    const [ tokens, setToken ] = useState<any[] | null[]>([])

    

    function toggleSelect () {
        setSelectedAll(!selectedAll)
        

        if (!selectedAll) {
            
            let allToken: number[] = [];
            
            tokens.forEach(token => {
                // @ts-ignore
                allToken.push(token.id)    
            })

            setSelected([...allToken])

        } else {
            setSelected([])
        }
    }

    async function getTokens() {

        const res: IResponse  = await fetchTokens()

        if (res.status == 200) {
            setToken([...res.data])
        }

        return;
    }

    function toggleMore () {
        setMore(!more)
    }

    function toggleSelection (id: number) {
        if (selected.includes(id)) {
            let newSeleceted: number[] = selected.filter(item => item != id)

            setSelected([...newSeleceted])
            setSelectedAll(false)
        } else {
            setSelected([ ...selected, id ])
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

    useEffect(() => {
        getTokens()
    }, [])

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