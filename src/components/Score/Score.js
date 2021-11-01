import React from 'react'
import './Score.css'

const Score = props => {
    return (
        <div>
            <div className='score'>
            {/* <i class="fas fa-star"></i> */}
                <h2>Score: {props.number} </h2>
            </div>
        </div>
    )
}

export default Score
