import React from 'react';
import '../style.css'

export default function TermRatingItem(props) {

    const season = props.item.term.season ? props.item.term.season : "N/A"
    const ind_rating = props.item.average_rating

    let displayed_rating = <p></p>
    if (ind_rating > 4 ) {
        displayed_rating=  <p className='overall--rating--pill-4'>{ind_rating}/5</p>
    } else if (ind_rating < 4 && ind_rating > 2.9) {
        displayed_rating=  <p className='overall--rating--pill-3'>{ind_rating}/5</p>
    } else if (ind_rating < 3 && ind_rating > 1.9) {
        displayed_rating=  <p className='overall--rating--pill-2'>{ind_rating}/5</p>
    } else if (ind_rating < 2 && ind_rating > 0.9) {
        displayed_rating=  <p className='overall--rating--pill-1'>{ind_rating}/5</p>
    } else {
        displayed_rating=  <p className='overall--rating--pill-0'>{ind_rating}/5</p>
    }

    return (
        <div className= "ind--rating--container">
            <div className= "ind--rating--term--container">
                <p className= "ind--term--text"> {props.item.term.end_year}/{props.item.term.start_year}, {season}: </p>
            </div>
            {displayed_rating}
            <div className= 'ind--num--ratings--container'>
                <p className= "ind--num--rating--text">({props.item.num_ratings} ratings)</p>
            </div>
        </div>
    )
}