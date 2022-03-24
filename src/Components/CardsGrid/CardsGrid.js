import React from 'react'
import { useSelector } from 'react-redux'
import style from './style.module.scss'
import {dateFormat} from 'API'
import CurrencyCard from '../CurrencyCard/CurrencyCard'
import { motion } from 'framer-motion'

export default function CardsGrid(){
    const {data, shift} = useSelector(store => store.api)

    function getCurrentData(){
        return data[dateFormat(shift)]?.Valute ?? false
    }

    return (
        <main
        className = {style.CardsGrid}
        >
            {getCurrentData() && 
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
            }
        </main>
    )
}