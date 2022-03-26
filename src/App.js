import './Global.scss';
import {setTheme} from 'Theme'
import React, {useState, useEffect} from 'react'

import DateWidget from './Components/DateWidget/DateWidget';
import Tooltip from './Components/Tooltip/Tooltip';
import ViewSwitch from './Components/ViewSwitch/ViewSwitch';
import Details from './Components/Details/Details';

import {apiReducer} from 'Reducers'
import { useDispatch, useSelector } from 'react-redux';
import CardsGrid from './Components/CardsGrid/CardsGrid'

import {dateFormat, getStoredData, fetchApi} from 'API'

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
            <Tooltip/>
            <header
            className = 'header'
            >
                <section
                className = 'header-whitespace'
                />
                <aside
                className = 'header-content'
                >
                    <DateWidget/>
                    <ViewSwitch/>
                </aside>
            </header>

            <div className = 'main-container'>
                <Details/>
                <CardsGrid/>
            </div>
        </div>
    )
}

export default App;
