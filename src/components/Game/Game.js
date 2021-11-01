import React, { useState, useEffect } from 'react';
import random_players from '../../data/random_players.json';
import player_ids from '../../data/player_ids.json'
import Lives from '../Lives/Lives';
import Score from '../Score/Score';
import Gameover from '../Gameover/Gameover';
import './Game.css'

const Game = () => {

    const [player, setPlayer] = useState('')
    const [playerStats, setPlayerStats] = useState('')
    const [answers, setAnswers] = useState([])
    const [score, setScore] = useState(0)
    const [lives, setLives] = useState(3)
    const [isGameOver, setIsGameOver] = useState(false)
    const [isVisible, setIsVisible] = useState('none')
    const [livesColor, setLivesColor] = useState('green')
    const [borderColor, setBorderColor] = useState({border: '3px solid transparent'})

    const restartGame = () => {
        answers.length = 0
        localStorage.removeItem('score');
        setLivesColor('green')
        setIsVisible('none')
        setScore(0)
        setIsGameOver(false)
        setLives(3)
        renderGame()
    }

    const renderGame = () => {

        answers.length = 0
        let randNum = player_ids[Math.floor(Math.random()*player_ids.length)]
        Promise.all([
            fetch(`https://www.balldontlie.io/api/v1/players/${randNum}`).then(value => value.json()),
            fetch(`https://www.balldontlie.io/api/v1/season_averages?player_ids[]=${randNum}`).then (value => value.json())
            ])
            .then((value) => {
                setPlayerStats(value[1].data[0])
                setPlayer(value[0])
                setAnswers(oldArray => [...oldArray, value[0].first_name+" "+value[0].last_name]); 
                setAnswers(oldArray => [...oldArray, random_players[Math.floor(Math.random() * random_players.length)]])
                setAnswers(oldArray => [...oldArray, random_players[Math.floor(Math.random() * random_players.length)]])
                setAnswers(oldArray => [...oldArray, random_players[Math.floor(Math.random() * random_players.length)]])
                setAnswers(oldArray => [...oldArray].sort((a, b) => 0.5 - Math.random()))
                
            })

    }

    useEffect(() => {
        renderGame()
    }, [])

    const changeBorderColor = (color) => {
        setBorderColor({border: '3px solid '+color})
        setTimeout(function(){
            setBorderColor({border: '3px solid transparent'})
        },500)
    }

    function handleClick(answ) {
        if (answ === `${player.first_name} ${player.last_name}`) {
            setScore(score + 1)
            setIsVisible('none')
            renderGame()
            changeBorderColor('green')
        }
        else {
            changeBorderColor('red')            
            setLives(lives - 1)
            if (lives === 3) {
                setLivesColor('orange')
            }
            if (lives === 2) {
                setLivesColor('red')
            }
            if (lives === 1) {
                setIsGameOver(true)
                localStorage.setItem('score', score);
            }
        } 
    }

    const getRandomTip = () => {
        const array = [
        <img src={!player ? null : nba.getTeamLogoURLs(player.team.abbreviation)[0]}></img>, 
        !player ? null : `${player.position}`,
        !player ? null : player.height_feet === null ? `` : `${player.height_feet}'${player.height_inches}"`]
        return array[Math.floor(Math.random()*array.length)]
    }

    function tip() {
        setIsVisible('block')
        setScore(score - 1)
    }


    const nba = require('nba-api-client');
    return (
        

        <div className='main' style={borderColor}>
            <div className='player-container'>

                {!player ? <div class="lds-dual-ring"></div> :
                    <table>
                        <thead>
                            <tr>
                                <th>PPG</th>
                                <th>RPG</th>
                                <th>APG</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{!playerStats ? null : playerStats.pts.toFixed(1)}</td>
                                <td>{!playerStats ? null : playerStats.reb.toFixed(1)}</td>
                                <td>{!playerStats ? null : playerStats.ast.toFixed(1)}</td>
                            </tr>
                        </tbody>
                    </table>}
                    
                
            </div>
            <h2 className='tip' style={{display:isVisible}}>{getRandomTip()}</h2>
            {answers.map((answ) => (
                <div className='answer' onClick={() => handleClick(answ)} key={answ}>{answ}</div>
            ))}
            <div className='footer'>
                <Score number={score}/>
                <button className='tip-button' onClick={() => tip()}>TIP<p>-1 score</p></button>
                <Lives style={livesColor} number={lives}/>
            </div>
            
            <Gameover score={score} trigger={isGameOver} onClick={()=>restartGame()}></Gameover>
        </div>
    )
}

export default Game
