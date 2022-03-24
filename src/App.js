import './Global.scss';
import {setTheme} from 'Theme'
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import DateWidget from './Components/DateWidget/DateWidget';
import CurrencyCard from './Components/CurrencyCard/CurrencyCard';

const x = {
    "USD": {
        "ID": "R01235",
        "NumCode": "840",
        "CharCode": "USD",
        "Nominal": 1,
        "Name": "Доллар США",
        "Value": 103.9524,
        "Previous": 104.8012
    }
}

function App() {
    useEffect(() => {
        const API = 'https://www.cbr-xml-daily.ru'
        const URL = `${API}/daily_json.js`
        // axios.get(URL)
        // .then(({data}) => {
        //     console.log(data)
        // })
    }, [])

    return (
        <div className="App">
            {/* <DateWidget/> */}
            <CurrencyCard
            abbr = {'USD'}
            data = {x['USD']}
            />
        </div>
    )
}

export default App;
