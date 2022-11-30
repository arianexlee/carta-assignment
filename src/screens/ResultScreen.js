import React, { useEffect, useState } from 'react';
import getData from '../courseData.js'
import '../style.css'
import ResultItem from '../components/ResultItem';
import HeaderItem from '../components/HeaderItem'
import DetailItem from '../components/DetailItem';


export default function ResultScreen() {
    const [data, setData] = useState(null)
    const [focusedClass, setFocusedClass] = useState("none")

    useEffect(() => {
        getData(setData)
    }, [])

    function seen(id) {
        setData(prevData => {
            return prevData.map(item => {
                return (item.id === id ? {...item, bar_seen: true} : item)
            })
        })
    }

    const list = data ? data.map(item => {
        console.log(focusedClass)
        return (
            <ResultItem 
            key= {item.id}
            id = {item.id}
            item = {item}
            bar_seen = {item.bar_seen}
            seen = {seen}
            setFocus = {setFocusedClass}
            current_focus = {focusedClass}
            />
        )
    }) : <></>

    const side = 
        <DetailItem
        current_focus = {focusedClass}/>

    return (
        <div className = "all">
            <HeaderItem/>
            <div className = "body"> 
                <div className = "overall--result--container">
                    <div className = "num--results--container">
                        <h2 className = "num--results--text">{data ? "Showing " + data.length + " results" : "loading"}</h2>
                    </div>
                    <div className="hug--main--container">
                        <div>
                            {list}
                        </div>
                        {focusedClass != "none" && <div style={{ display: `${focusedClass != "none" ? "inline" : "none"}`}}>
                            {side}
                        </div>}
                    </div>
                </div>
            </div>
        </div>
        
    )
}