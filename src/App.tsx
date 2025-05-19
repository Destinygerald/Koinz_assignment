import { useEffect, useState } from 'react'
import './App.css'
import HarvestCard from './components/harvestCard'
import { Holdings } from './components/holdings'
import { Navbar } from './components/navbar'
import { Notice } from './components/notice'
import './fontface.css'
import { fetchGains, IResponse } from './api/fetchData'

function App() {

  const [ profitsAndLoss, setProfitAndLoss ] = useState<any>({})

   async function getTokens() {
  
    const res: IResponse  = await fetchGains()

    if (res.status == 200) {
      setProfitAndLoss({...res.data})
    }

    return;

  }


  useEffect(() => {
    getTokens()
  }, [])

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
                realisedCapitalGains={0}
              />
              
              <HarvestCard 
                type='post' 
                shortTermProfit={profitsAndLoss?.stcg?.profits}
                shortTermLoss={profitsAndLoss?.stcg?.losses}
                longTermProfit={profitsAndLoss?.ltcg?.profits}
                longTermLoss={profitsAndLoss?.ltcg?.losses}
                effectiveCapitalGains={0}
              />
          </div>


          <Holdings />
        </div>
      </main>
    </div>
  )
}

export default App
