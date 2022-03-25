import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import style from './style.module.scss'
import { motion, AnimatePresence } from 'framer-motion'
import CurrencyCard from '../CurrencyCard/CurrencyCard'
import {FaSortDown, FaSortUp} from 'react-icons/fa'
import {detailsReducer} from 'Reducers'

function Pointer({prev, cur}){
    const Arrow = cur > prev ? FaSortDown : FaSortUp

    return (
        <>
        <b>{cur}</b>
        <Arrow
        style = {{
            transform: `translateY(${cur > prev ? -15 : 30}%)`,
            marginLeft: '5px',
        }}
        />
        </>
    )
}

function TableLine({line}){
    return (
        <div
        className = {style.DetailsTableLine}
        >
            {line
            ?
            <>
            <div>{line.date}</div>
            <div
            className = {style.DetailsTableLineValue}
            >
                <Pointer
                prev = {line.prev}
                cur = {line.cur}
                />
            </div>
            </>
            :
            <span
            className = {style.DetailsTableLineNoData}
            >-</span>
            }            
        </div>
    )
}

function Table(){
    const {detailsItem, showDetails} = useSelector(store => store.det)
    const {data} = useSelector(store => store.api)

    function getTable(){
        return Object.keys(data).map((date) => {
            if(data[date]?.Valute){
                let cur = data[date]?.Valute[detailsItem.CharCode].Value
                let prev = data[date]?.Valute[detailsItem.CharCode].Previous
                return {date, cur, prev}
            }
            else{
                return null
            }
        })
    }

    return (
        <div
        className = {style.DetailsTable}
        >
            {getTable().map((e,i)=>(
                <TableLine
                key = {i}
                line = {e}
                />
            ))}
        </div>
    )
}

export default function Details(){
    const dispatch = useDispatch()
    const {detailsItem, showDetails} = useSelector(store => store.det)
    const {data} = useSelector(store => store.api)

    function handleCloseClick(){
        dispatch(detailsReducer.setShowDetails(false))
    }

    return (
        <AnimatePresence exitBeforeEnter>
        {showDetails && detailsItem &&
            <motion.aside
            className = {style.Details}
            initial = {{
                x: '-50vw',
                maxWidth: 0,
                minWidth: 0,
            }}
            animate = {{
                x: 0,
                maxWidth: '33vw',
                minWidth: '33vw',
            }}
            transition = {{
                ease: "linear",
                duration: 0.1,
            }}
            exit = {{
                x: '-50vw',
                maxWidth: 0,
                minWidth: 0,
            }}
            >
                <CurrencyCard
                data = {detailsItem}
                />

                <div
                className = {style.DetailsFullname}
                >
                    {detailsItem.Nominal == 1 ? '' : detailsItem.Nominal + '  '}
                    {detailsItem.Name}
                </div>

                <Table/>
                <button
                className = {style.DetailsCloseBtn}
                onClick = {handleCloseClick}
                >&times;</button>
            </motion.aside>
        }
        </AnimatePresence>
    )
}