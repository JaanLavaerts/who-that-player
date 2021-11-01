import React from 'react'
import './Lives.css'

const Lives = props => {
    return (
        <div>
            <div className='lives'>
            {/* <i class="fas fa-heart"></i> */}
                <h2>Lives: <span style={{color:props.style}}>{props.number}</span></h2>
            </div>
        </div>
    )
}

export default Lives
