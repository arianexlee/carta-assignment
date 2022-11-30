import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom"


export default function ResultItem(props) {

    const gen_reqs = props.item.general_requirements
    const pills = gen_reqs.length > 0 ? 
    gen_reqs.map(item => {
        return (
            <h3 className = "genreq">{item}</h3>
        )
    }) : 
    <h3 className = "no-genreq">No General Requirements</h3>


    const units = props.item.max_units === props.item.min_units ? 
    <p className = "course--stat--text">{props.item.max_units}</p> : 
    <p className = "course--stat--text">{props.item.min_units}-{props.item.max_units}</p>
    

    const seasons_offered = props.item.seasons_offered
    const terms = seasons_offered.length > 0 ?
    seasons_offered.map(item => {
        if (item === "autumn") {
            return (
                <p className = "course--stat--pill-aut">Aut</p>
            )
        } else if (item === "winter") {
            return (
                <p className = "course--stat--pill-win">Win</p>
            )
        } else if (item === "spring") {
            return (
                <p className = "course--stat--pill-spr">Spr</p>
            )
        } else {
            return (
                <p className = "course--stat--pill-sum">Sum</p>
            )
        }
    }) : <p className = "course--stat--pill-none">None</p>

    const instructors = []
    if (props.item.ratings.length > 0) {
        for (let i = 0; i < props.item.ratings.length; i++) {
            let instructor_name = props.item.ratings[i].instructor_name
            if (!instructors.includes(instructor_name) && !instructors.includes(", "+ instructor_name)) {
                if (instructors.length > 0) {
                    instructors.push(", "+ instructor_name)
                } else {
                    instructors.push(instructor_name)
                }
            }
        }
    } else {
        instructors.push("N/A")
    }

    let current_focus_id = "none"
    if (props.current_focus != "none") {
        current_focus_id = props.current_focus.id
    }

    return (
        <div className = {`result--container--${current_focus_id === props.item.id ? "focused" : "unfocused"}`} onClick = {() => {
            props.seen(props.id)
            props.setFocus(props.item)
        }}>
            <div className = {`seen--bar--${props.bar_seen ? "true" : "false"}`}></div>
            <div className = "course--container">
                <h1 className = "course--title">{props.item.course_codes[0]}: {props.item.title}</h1>
                <div className = "genreq--container">
                    {pills}
                </div>
                <div className = "course--info--container">
                    <div className = "course--desc-container">
                        <p className = "course--desc--text">{props.item.description}</p>
                    </div>
                    <div className = "course--allstats--container">
                        <div className = "course--stat--container">
                            <p className = "course--stat--title">Units:</p>
                            {units}
                        </div> 
                        <div className = "course--stat--container">
                            <p className = "course--stat--title">Term:</p>
                            <div className = "course--stat--pill--container">
                                {terms}
                            </div>
                        </div> 
                        <div className = "course--stat--container">
                            <p className = "course--stat--title">Grading:</p>
                            <p className = "course--stat--text">{props.item.grading}</p>
                        </div> 
                        <div className = "course--stat--container">
                            <p className = "course--stat--title">Instructors:</p>
                            <p className = "course--stat--text">{instructors}</p>
                        </div> 
                    </div>
                </div>
            </div>
        </div>
    )
}