import React from 'react'
import { useSelector } from 'react-redux'
import style from './style.module.scss'
import { motion } from 'framer-motion'

export default function Tooltip(){
    const {pos, tooltip, visible} = useSelector(store => store.tip)

    return (
        <motion.div
        inital = {{
            opacity: 0,
        }}
        animate = {{
            opacity: visible ? 1 : 0,
        }}
        className = {style.Tooltip}
        style = {{
            left: pos.x,
            top: pos.y,
        }}
        >
            {tooltip}
        </motion.div>
    )
}