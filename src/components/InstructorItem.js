import React from 'react';
import '../style.css'
import TermRatingItem from '../components/TermRatingItem'

export default function InstructorItem(props) {

    let overall_rating = <p></p>
    const converted_rating = parseFloat(props.item[0].average_rating)
    if (converted_rating > 4 ) {
        overall_rating=  <p className='overall--rating--pill-4'>Overall Rating: {props.item[0].average_rating}/5</p>
    } else if (converted_rating < 4 && converted_rating > 2.9) {
        overall_rating=  <p className='overall--rating--pill-3'>Overall Rating: {props.item[0].average_rating}/5</p>
    } else if (converted_rating < 3 && converted_rating > 1.9) {
        overall_rating=  <p className='overall--rating--pill-2'>Overall Rating: {props.item[0].average_rating}/5</p>
    } else if (converted_rating < 2 && converted_rating > 0.9) {
        overall_rating=  <p className='overall--rating--pill-1'>Overall Rating: {props.item[0].average_rating}/5</p>
    } else {
        overall_rating=  <p className='overall--rating--pill-0'>Overall Rating: {props.item[0].average_rating}/5</p>
    }
    
    const ratings_array = props.item[0].ratings
    const term_ratings_graphs = ratings_array.map(item => {
        return (
            <TermRatingItem 
            key= {item.term.id}
            item = {item}
            />
        )
    })

    return (
        <div className= "instr--container">
            <div className= "instr--name--container">
                <h2 className= "instr--name">{props.item[0].instructor_name}</h2>
            </div>
            <div className= "ratings-container">
                <div className= "overall--ratings--container">
                        {overall_rating}
                        <p className='overall--num--ratings--text'> ({props.item[0].tot_num_ratings} ratings)</p>
                </div>
                <div className= "ratings--container">
                    {term_ratings_graphs}
                </div>
            </div>
        </div>
    )
}