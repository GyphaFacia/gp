import React from 'react'
import style from './style.module.scss'
import {BsFillGrid3X3GapFill, BsReverseLayoutTextSidebarReverse} from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { viewReducer } from 'Reducers'

export default function ViewSwitch(){
    const dispatch = useDispatch()
    const {viewMode} = useSelector(store => store.view)

    const Icon = viewMode == 'grid' ? BsFillGrid3X3GapFill : BsReverseLayoutTextSidebarReverse

    function handleClick(){
        let vm = viewMode == 'grid' ? 'table' : 'grid'
        dispatch(viewReducer.setViewMode(vm))
    }

    return (
        <button
        className = {style.ViewSwitch}
        onClick = {handleClick}
        >
            <Icon/>
        </button>
    )
}