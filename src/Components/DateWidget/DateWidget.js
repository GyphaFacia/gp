import React from 'react'
import style from './style.module.scss'
import {AiOutlineDoubleRight, AiOutlineDoubleLeft} from 'react-icons/ai'
import { motion, AnimatePresence } from 'framer-motion'

function DateWidgetDate({day, leftOrRight}){
    function getDateString(){
        const d = new Date(new Date().setDate(new Date().getDate() + day))
        return `${d.getDate()}
        ${d.toDateString().split(' ')[1].toLocaleLowerCase()}
        ${d.getFullYear()}`
    }

    return (
        <motion.div
        className = {style.DateWidgetDate}
        initial = {{
            x: (leftOrRight ? '-' : '') + '100%',
            opacity: 0,
        }}
        animate={{
            x: 0,
            opacity: 1,
        }}
        exit={{
            x: (leftOrRight ? '' : '-') + '100%',
            opacity: 0,
        }}
        transition = {{
            linear: 0,
            duration: 0.2,
        }}
        >
            {getDateString()}
        </motion.div>
    )
}

export default function DateWidget(){
    const [day, setDay] = React.useState(0)
    const [leftOrRight, setLeftOrRight] = React.useState(true)

    function handleClick(delta){
        setLeftOrRight(delta > 0)
        setTimeout(()=>{
            setDay(prev => prev + delta)
        }, 0)
    }

    return (
        <section
        className = {style.DateWidget}
        >
            <button
            className = {style.DateWidgetButton}
            onClick = {()=>{handleClick(-1)}}
            >
                <AiOutlineDoubleLeft/>
            </button>
            
            <div
            className = {style.DateWidgetDateContainer}
            >
                <AnimatePresence exitBeforeEnter>
                    <DateWidgetDate
                    key={day}
                    day = {day}
                    leftOrRight = {leftOrRight}
                    />
                </AnimatePresence>
            </div>
            
            <button
            className = {style.DateWidgetButton}
            onClick = {()=>{handleClick(1)}}
            >
                <AiOutlineDoubleRight/>
            </button>
        </section>
    )
}