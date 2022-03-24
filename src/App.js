import './Global.scss';
import {setTheme} from 'Theme'
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import DateWidget from './Components/DateWidget/DateWidget';
import CurrencyCard from './Components/CurrencyCard/CurrencyCard';
import { getSelectionRange } from '@testing-library/user-event/dist/utils';

import {apiReducer} from 'Reducers'
import { useDispatch, useSelector } from 'react-redux';
import CardsGrid from './Components/CardsGrid/CardsGrid'

import {dateFormat, getStoredData} from 'API'

function App() {
    const dispatch = useDispatch()

    useEffect(async () => {
        for(let i = 0; i > -11; i--){
            dispatch(apiReducer.addDate({
                key: dateFormat(i),
                val: await getStoredData(i)
            }))
        }
        
    }, [])

    return (
        <div className="App"
        >
            <CardsGrid/>
        </div>
    )
}

export default App;
