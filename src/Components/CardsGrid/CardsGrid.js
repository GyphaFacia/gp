import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import style from './style.module.scss'
import {dateFormat} from 'API'
import CurrencyCard from '../CurrencyCard/CurrencyCard'
import { motion } from 'framer-motion'
import { apiReducer } from 'Reducers'

function ApiError(){
    const dispatch = useDispatch()
    const {data, shift} = useSelector(store => store.api)

    function getClosestDate(){
        let best = -1
        for(let i = -10; i <= 0; i++){
            const dateI = data[dateFormat(i)]
            const exists = dateI && !dateI.hasOwnProperty('error')
            const delta = Math.abs(shift - best) > Math.abs(shift - i)
            if(exists && delta){
                best = i
            }
        }

        return best
    }

    getClosestDate()

    return (
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
            <div>Курс ЦБ РФ на данную дату не установлен.</div>
            <div>Ближайшая дата:</div>
            <button
            onClick = {()=>{
                dispatch(apiReducer.setShift(getClosestDate()))
            }}
            className = {style.ErrorBtn}
            >{dateFormat(getClosestDate())}</button>
        </motion.div>
    )
}

export default function CardsGrid(){
    const {data, shift} = useSelector(store => store.api)
    const {viewMode} = useSelector(store => store.view)

    function getCurrentData(){
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
                    style = {{
                        margin: viewMode == 'grid' ? 'var(--offset5r)' : 'var(--offset2)'
                    }}
                    >
                        <CurrencyCard
                        data = {getCurrentData()[e]}
                        />
                    </motion.div>
                ))
            :
                <ApiError/>
            }
        </main>
    )
}