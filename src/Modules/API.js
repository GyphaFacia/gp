import axios from "axios"

// API просит не спамить запросами, поскольку данные обновляются
// не чаще раза в день. Будем уважать их просьбу. Сохраним запросы
// к API в storage.1
export async function getStoredData(shift){
    return readStorage(shift) ?? await writeStorage(shift)
}

export function readStorage(shift){
    const old = localStorage.getItem(dateFormat(shift))
    if(old == null){ return null }
    return JSON.parse(old)
}

export async function writeStorage(shift){
    try {
        const data = await fetchApi(shift)
        localStorage.setItem(dateFormat(), JSON.stringify(data))
        return data    
    } catch (error) {
        console.warn(error)
        const data = {error: 'No data'}
        localStorage.setItem(dateFormat(), JSON.stringify(data))
        return data
    }
    
}

export function dateFormat(shift = 0){
    const d = new Date(new Date().setDate(new Date().getDate() + shift))
    let day = d.getDate()
    let month = d.getMonth() + 1
    let year = d.getFullYear()
    day = `${day}`.length > 1 ? day : `0${day}`
    month = `${month}`.length > 1 ? month : `0${month}`
    return `${year}/${month}/${day}`
}

export async function fetchApi(shift = 0){
    const API = `https://www.cbr-xml-daily.ru/archive`
    const URL = `${API}/${dateFormat(shift)}/daily_json.js`

    const {data} = await axios.get(URL)
    return data
}