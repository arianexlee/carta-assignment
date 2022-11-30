import React, { useEffect, useState } from 'react';
import getData from '../courseData.js'
import '../style.css'
import ResultItem from '../components/ResultItem';
import logo from '../imgs/carta_logo.png'

export default function HeaderItem() {
    return(
        <div className = "header">
            <img src={logo} alt="Logo" style={{ height: '24px', }}/>
        </div>
    )
}