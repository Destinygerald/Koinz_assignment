import { useEffect, useState } from 'react'
import './App.css'
import HarvestCard from './components/harvestCard'
import { Holdings } from './components/holdings'
import { Navbar } from './components/navbar'
import { Notice } from './components/notice'
import './fontface.css'
import { fetchGains, fetchTokens, IResponse } from './api/fetchData'
import { useAppDispatch, useAppSelector } from './redux/hooks'
import { setAvailableTokens } from './redux/features/availableToken'

function App() {

  const [ profitsAndLoss, setProfitAndLoss ] = useState<any>({})

  const [ varyingProfitLoss, setVaryingProfitLoss ] = useState<any>({})

  const selectedTokens = useAppSelector(state => state.selectedTokens.value)
  const availableTokens = useAppSelector(state => state.availableTokens.value)
  
  


  const dispatch = useAppDispatch()

  async function getCardInfo() {
  
    const res: IResponse  = await fetchGains()
    
    if (res.status == 200) {
      setProfitAndLoss({...res.data})
      setVaryingProfitLoss({...res.data})
    }
    return;
  }

  async function getTokens() {
  
      const res: IResponse  = await fetchTokens()

      if (res.status == 200) {
        dispatch(setAvailableTokens(res.data))
      }

      return;
  }


  function handleSelection () {
    const res = availableTokens.filter(a => selectedTokens.includes(a.id))
    
    let profit = profitsAndLoss?.stcg?.profits
    let loss = profitsAndLoss?.stcg?.losses

    res.forEach(item => {
      if (item.stcg.gain > 0) {
        profit += item.stcg.gain
      } else {
        loss -= item.stcg.gain
      }
    })


    setVaryingProfitLoss({
      ...varyingProfitLoss, stcg: {
          profits: profit,
          losses: loss
      }   
    })
  }

  useEffect(() => {
    getTokens()
    getCardInfo()
  }, [])

 
  useEffect(() => {
    handleSelection()
  }, [selectedTokens])

  return (
    <div className='app'>
        <Navbar />

        <main className='app-main'>
          <div className='app-main-container'>
            <div className='app-main-header'>
              <span>Tax Harvesting</span>
              <span>How it works?</span>

              <div className='app-main-header-note'>
                Lorem ipsum dolor sit amet consectetur. Euismod id posuere nibh semper mattis scelerisque tellus. Vel mattis diam duis morbi tellus dui consectetur. Know More
              </div>
            </div>

            <Notice />

            <div className='app-main-cards'>
                <HarvestCard 
                  type='pre' 
                  shortTermProfit={profitsAndLoss?.stcg?.profits}
                  shortTermLoss={profitsAndLoss?.stcg?.losses}
                  longTermProfit={profitsAndLoss?.ltcg?.profits}
                  longTermLoss={profitsAndLoss?.ltcg?.losses}
                  
                />
                
                <HarvestCard 
                  type='post' 
                  shortTermProfit={varyingProfitLoss?.stcg?.profits}
                  shortTermLoss={varyingProfitLoss?.stcg?.losses}
                  longTermProfit={profitsAndLoss?.ltcg?.profits}
                  longTermLoss={profitsAndLoss?.ltcg?.losses}
                />
            </div>


            <Holdings />
          </div>
        </main>
    </div>
  )
}

export default App
