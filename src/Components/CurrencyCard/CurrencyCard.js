import React from 'react'
import style from './style.module.scss'
import {motion} from 'framer-motion'
import { useDispatch } from 'react-redux'
import {tooltipReducer} from 'Reducers'

function TooltipWrapper(props){
    const dispatch = useDispatch()
    const ttipRef = React.useRef(null)

    function handleMouseEnter(e){
        dispatch(tooltipReducer.setVisible(true))
        dispatch(tooltipReducer.setTooltip(props.data.Name))
    }

    function handleMouseLeave(e){
        dispatch(tooltipReducer.setVisible(false))
    }

    function handleMouseMove(e){
        const {clientX, clientY} = e
        dispatch(tooltipReducer.setPos({x: clientX, y: clientY}))
    }

    return (
        <div
        onMouseEnter = {handleMouseEnter}
        onMouseLeave = {handleMouseLeave}
        onMouseMove = {handleMouseMove}
        ref = {ttipRef}
        {...props}
        />
    )
}


const MIN_FRICT = 0
const MAX_FRICT = 500
const FRICT_DELTA = 50
function HoveringWrapper(props){
    const [cursor, setCursor] = React.useState({x: 0, y: 0})
    const hoverRef = React.useRef()
    const [frict, setFrict] = React.useState(500)
    const [delay, setDelay] = React.useState(null)

    React.useEffect(() => {
        return () => {
            clearInterval(delay)
        }
    }, [])

    function handleMouseMove(e){
        const {clientX, clientY} = e
        const {left, top, width, height} = hoverRef.current.getBoundingClientRect()
        let layerX = (clientX - left)/width*100
        let layerY = (clientY - top)/height*100

        let x = -(layerX - 50)/365/width
        let y = -(layerY - 50)/365/height
        
        setCursor({x, y})
    }

    function handleMouseEnter(e){
        if(delay != null){ clearTimeout(delay) }
        setFrict(500)
        setDelay(setInterval(() => {
            setFrict(prev => prev <= MIN_FRICT ? MIN_FRICT : prev - FRICT_DELTA)
        }, 16))
    }

    function handleMouseLeave(e){
        if(delay != null){ clearTimeout(delay) }
        setFrict(500)
        setCursor({x:0, y:0})
        setDelay(setInterval(() => {
            setFrict(prev => prev >= MAX_FRICT ? MAX_FRICT : prev + FRICT_DELTA)
        }, 16))
    }
    
    return (
        <div
        onMouseMove = {handleMouseMove}
        onMouseEnter = {handleMouseEnter}
        onMouseLeave = {handleMouseLeave}
        ref = {hoverRef}
        style={{
            transform: `matrix3d(1,0,0.00,${cursor.x},0.00,1,0.00,${cursor.y},0,0,1,0,0,0,0,1)`,
            transitionDuration: `${frict}ms`,
        }}
        {...props}
        />
    )
}

const defaultPos = {x: 25, y: 25}
export default function CurrencyCard({data}){
    const prec = (val, precision = 100) => Math.round(val * precision)/precision

    function calcGrowth(precision = 100){
        let res = 100 - data.Value/data.Previous * 100
        return prec(res)
    }

    return (
        <TooltipWrapper
        data = {data}
        >
        <HoveringWrapper>
        <div
        className = {style.CurrencyCard}
        >
            <span
            className = {style.CurrencyCardCode}
            >{data.CharCode}</span>
            <span
            className = {style.CurrencyCardValue}
            >{prec(data.Value)} руб.</span>
            <span
            className = {style.CurrencyCardPercent}
            >{calcGrowth()}%</span>
        </div>
        </HoveringWrapper>
        </TooltipWrapper>
    )
}