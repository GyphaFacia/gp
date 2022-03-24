import React from 'react'
import { useSelector } from 'react-redux'
import style from './style.module.scss'
import {dateFormat} from 'API'
import CurrencyCard from '../CurrencyCard/CurrencyCard'
import { motion } from 'framer-motion'

export default function CardsGrid(){
    const {data, shift} = useSelector(store => store.api)

    function getCurrentData(){
        const usd = data[dateFormat(shift)]?.Valute?.USD?.Value
        return data[dateFormat(shift)]?.Valute ?? false
    }

    return (
        <main
        className = {style.CardsGrid}
        >
            {getCurrentData()
            ?
                Object.keys(getCurrentData()).map((e, i)=>(
                    <motion.div
                    key = {e}
                    initial = {{
                        opacity: 0,
                        transform: `scaleX(-1)`
                    }}
                    animate = {{
                        opacity: 1,
                        transform: `scaleX(1)`,
                    }}
                    transition = {{
                        delay: i/25,
                    }}
                    >
                        <CurrencyCard
                        data = {getCurrentData()[e]}
                        />
                    </motion.div>
                ))
            :
                <motion.div
                className = {style.Error}
                initial = {{
                    opacity: 0,
                    x: '100vw',
                }}
                animate = {{
                    opacity: 1,
                    x: 0,
                }}
                transition = {{duration: 0.5}}
                >
                    Курс ЦБ РФ на данную дату не установлен.
                </motion.div>
            }
        </main>
    )
}