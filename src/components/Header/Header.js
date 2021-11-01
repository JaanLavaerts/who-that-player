import React from 'react'
import { Link } from 'react-router-dom'
import './Header.css'
import logo from './logo.png'


const Header = () => {
    return (
        <div style={{overflow:'hidden'}}>
            <header>
                {/* <h1><i class="fas fa-basketball-ball"></i>Who that player?</h1> */}
                <Link to='/' ><img src={logo}></img></Link>
                <h1>Who that player?</h1>
            </header>
        </div>
    )
}

export default Header
