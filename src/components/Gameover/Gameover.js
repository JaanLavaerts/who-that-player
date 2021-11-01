import React from 'react'
import './Gameover.css'
import { Link } from "react-router-dom";

function Gameover(props) {
    return (props.trigger) ? (
        <div className='popup'>
            <div className='popup-inner'>
                <h3>GAME OVER</h3>
                <h4>Your score was <span>{props.score}</span></h4>
                <button onClick={props.onClick} className='close-button'>Try Again</button>
                {props.score > 0 ? <button className='save-button'><Link to='/highscores'>Save Score</Link></button> : null}
            </div>
        </div>
    ) : null
}


export default Gameover

