import React from 'react';
import { Routes, Route } from "react-router-dom"
import ResultScreen from './screens/ResultScreen';
// import DetailsScreen from './screens/DetailsScreen';
import './style.css'

export default function App() {

    return <Routes>
        <Route path= "/" element= {<ResultScreen/>}/>
        {/* <Route path= "/details" element= {<DetailsScreen/>}/> */}
    </Routes>
}