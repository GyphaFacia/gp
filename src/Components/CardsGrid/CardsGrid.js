import React from 'react'
import { useSelector } from 'react-redux'
import style from './style.module.scss'
import {dateFormat} from 'API'
import axios from 'axios'
import CurrencyCard from '../CurrencyCard/CurrencyCard'

export default function CardsGrid(){
    const {data, shift} = useSelector(store => store.api)

    function getCurrentData(){
        return data[dateFormat(shift)]?.Valute ?? null
    }

    return (
        <main
        className = {style.CardsGrid}
        >
            {getCurrentData() && 
                Object.keys(getCurrentData()).map((e, i)=>(
                    <CurrencyCard
                    key = {e}
                    data = {getCurrentData()[e]}
                    />
                ))
            }
        </main>
    )
}