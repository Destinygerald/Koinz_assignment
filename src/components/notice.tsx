import '../styles/components.css'
import { useState } from 'react'
import { IoMdInformationCircleOutline } from 'react-icons/io'
import { RxCaretDown, RxCaretUp } from 'react-icons/rx'


const NoticeInfoArray: INoticeInfo[] = [
    {
        header: 'Price Source Disclaimer',
        content: `Please note that the current price of your coins may differ from the price listed on the specific exchanges.
        This is because we use CoinGecko as our default price source for certain exchanges, rather than fetching prices directly from the exchange.
        `
    },

    {
        header: 'Country-specific Availability',
        content: `Tax loss harvesting may not be supported in all countries. We strongly recommend consulting with your local tax advisor
        or accountant before performing any related actions on your exchange.
        `
    },
    {
        header: 'Utilization of Losses',
        content: ` Tax loss harvesting typically allows you to offset capital gain. However, if you have zero or no applicable crypto capital gains,
        the usuability of those harvested losses may be limited. Kindly confirm with your tax advisor how such losses can be applied in your situation.
        `
    }
]

interface INoticeInfo {
    header: string,
    content: string
}

function NoticeInfo ({ header, content }: INoticeInfo) {
    return (
        <li className='notice-details-content'>
            <span>{header}:</span>
            <span>{content}</span>
        </li>
    )
}

export function Notice () {
    
    const [ opened, setOpened ] = useState<boolean>(false)


    function Caret () {
        return opened ? <RxCaretUp /> : <RxCaretDown />
    }

    function toggleOpened () {
        setOpened(!opened)
    }

    return (
        <div className='notice' onClick={toggleOpened}>
            <div className='notice-top'>
                <div>
                    <span className='icon'> <IoMdInformationCircleOutline /> </span>
                    <span>Important Notes & Disclaimers</span>
                </div>

                <span className='icon'> { Caret() }</span>
            </div>

            {
                opened
                ?
                <ul className='notice-details'>
                    {
                        NoticeInfoArray.map((info, index) => (
                            <NoticeInfo key={index} header={info.header} content={info.content} />
                        ))
                    }
                </ul>
                :
                ""
            }
        </div>
    )
}