import React from 'react';
import { useLocation } from "react-router-dom"
import '../style.css'
import InstructorItem from './InstructorItem'


export default function DetailItem(props) {

    const ratings = props.current_focus.ratings

    const instructor_totals = new Object()
    for (let i = 0; i < ratings.length; i++) {
        const instructor_name = ratings[i].instructor_name
        if (instructor_name in instructor_totals) {
            instructor_totals[instructor_name].tot_num_ratings += ratings[i].num_ratings
            instructor_totals[instructor_name].tot_rating += ratings[i].num_ratings * ratings[i].average_rating
            instructor_totals[instructor_name].ratings.push(ratings[i])
        } else {
            instructor_totals[instructor_name] = new Object()
            instructor_totals[instructor_name].tot_num_ratings = ratings[i].num_ratings
            instructor_totals[instructor_name].tot_rating = ratings[i].num_ratings * ratings[i].average_rating
            instructor_totals[instructor_name].ratings = [ratings[i]]
        }
    }

    const instructor_totals_array = []

    for (const instructor in instructor_totals) {
        const average_rating = instructor_totals[instructor].tot_rating / instructor_totals[instructor].tot_num_ratings
        instructor_totals[instructor].instructor_name = instructor
        instructor_totals[instructor].average_rating = average_rating.toFixed(1)
        instructor_totals[instructor].ratings = instructor_totals[instructor].ratings.sort(
            (r1, r2) =>
            (r1.term.stanford_term_id < r2.term.stanford_term_id ) ? 1 : -1
        )
        const instructor_list = [instructor_totals[instructor]]
        instructor_totals_array.push(instructor_list)
    }
       
    const instr_evals = instructor_totals_array.length > 0 ? instructor_totals_array.map(item => {
        return (
            <InstructorItem 
            key= {item}
            item = {item}
            />
        )
    }) : <p>No Data Available</p>

    const instructors = []
    if (instructor_totals_array.length > 0) {
        for (const instructor in instructor_totals) {
            if (!instructors.includes(instructor) && !instructors.includes(", " + instructor)) {
                if (instructors.length > 0) {
                    instructors.push(", "+ instructor)
                } else {
                    instructors.push(instructor)
                }
            }
        }
    } else {
        instructors.push("N/A")
    }

    const gen_reqs = props.current_focus.general_requirements
    const pills = gen_reqs.length > 0 ? 
    gen_reqs.map(item => {
        return (
            <h3 className = "genreq">{item}</h3>
        )
    }) : 
    <h3 className = "no-genreq">No General Requirements</h3>


    const units = props.current_focus.max_units === props.current_focus.min_units ? 
    <p className = "course--stat--text">{props.current_focus.max_units}</p> : 
    <p className = "course--stat--text">{props.current_focus.min_units}-{props.current_focus.max_units}</p>
    

    const seasons_offered = props.current_focus.seasons_offered
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


    return (
        <div className= "details--container">
            <div className= "details--course--container">
                <h1 className= "details--course--title">{props.current_focus.course_codes[0]}: {props.current_focus.title}</h1>
                <div className = "genreq--container">
                    {pills}
                </div>
                <div className = "details--course--allstats--container">
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
                        <p className = "course--stat--text">{props.current_focus.grading}</p>
                    </div> 
                    <div className = "course--stat--container">
                        <p className = "course--stat--title">Instructors:</p>
                        <p className = "course--stat--text">{instructors}</p>
                    </div> 
                </div>
                <div className = "details--course--desc-container">
                        <p className = "course--desc--text">{props.current_focus.description}</p>
                </div>
            </div>
            <div className= "details--instr--evals--container">
                <h1 className= "details--instr--evals--title">Instructor Evaluations</h1>
                {instr_evals}
            </div>
        </div>
    )
}