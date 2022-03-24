import './Global.scss';
import {setTheme} from 'Theme'
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import DateWidget from './Components/DateWidget/DateWidget';
import CurrencyCard from './Components/CurrencyCard/CurrencyCard';
import { getSelectionRange } from '@testing-library/user-event/dist/utils';

import {apiReducer} from 'Reducers'
import { useDispatch, useSelector } from 'react-redux';

// API просит не спамить запросами, поскольку данные обновляются
// не чаще раза в день. Будем уважать их просьбу. Сохраним запросы
// к API в storage.
async function getStoredData(shift){
    return readStorage(shift) ?? await writeStorage(shift)
}

function readStorage(shift){
    const old = localStorage.getItem(dateFormat())
    if(old == null){ return null }
    return JSON.parse(old)
}

async function writeStorage(shift){
    const data = await fetchApi(shift)
    localStorage.setItem(dateFormat(), JSON.stringify(data))
    return data
}

function dateFormat(shift = 0){
    const d = new Date(new Date().setDate(new Date().getDate() + shift))
    let day = d.getDate()
    let month = d.getMonth() + 1
    let year = d.getFullYear()
    day = `${day}`.length > 1 ? day : `0${day}`
    month = `${month}`.length > 1 ? month : `0${month}`
    return `${year}/${month}/${day}`
}

async function fetchApi(shift = 0){
    const API = `https://www.cbr-xml-daily.ru/archive`
    const URL = `${API}/${dateFormat(shift)}/daily_json.js`

    const {data} = await axios.get(URL)
    return data
}

function App() {
    const dispatch = useDispatch()
    const {data, shift} = useSelector(store => store.api)

    useEffect(async () => {
        for(let i = 0; i > -11; i--){
            dispatch(apiReducer.addDate({
                key: dateFormat(i),
                val: await getStoredData(i)
            }))
        }
        
    }, [])

    function getCurrentData(){
        return data[dateFormat(shift)]?.Valute ?? null
    }

    return (
        <div className="App"
        style = {{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
        }}
        >
            {getCurrentData() && 
                Object.keys(getCurrentData()).map((e, i)=>(
                    <CurrencyCard
                    key = {e}
                    data = {getCurrentData()[e]}
                    />
                ))
            }
        </div>
    )
}

export default App;
