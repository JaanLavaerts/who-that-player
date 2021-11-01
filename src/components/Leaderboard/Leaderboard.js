
import './Leaderboard.css'
import React, { useState, useEffect } from 'react';

const Leaderboard = () => {

    const [leaderboard, setLeaderboard] = useState("")
    const [name, setName] = useState("")
    const [score] = useState(parseInt(localStorage.getItem('score')))

    const handleSubmit = (e) => {
        e.preventDefault()
        const submission = {name, score}
        if (score === 0) {
            alert("Can't add score 0. Step up yo game!")
        }
        else if (name === "") {
            alert("Can't add a nobody. Step up yo game!")
        }
        else {
            fetch('http://localhost:8000/leaderboard', {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(submission)
            }).then(() => {
                localStorage.setItem('score', 0)
                refreshPage()
            })
        }
        
    }

    useEffect(() => {
        fetch('http://localhost:8000/leaderboard')
        .then(res => {
            return res.json()
        })
        .then((data) => {
            setLeaderboard(data)
        })
    }, [])

    function refreshPage() {
        window.location.reload(false);
      }

    const listItems = leaderboard && leaderboard.sort((a,b) => (a.score < b.score) ? 1 : -1).map((user, index) =>
        
        <tr key={user.id}> 
            <td>{index+1}</td>
            <td>{user.name}</td>
            <td>{user.score}</td>
        </tr>
);

    return (
        
        <div className='leaderboard'>
            <h2>Leaderboard</h2>
            <form id='form' onSubmit={handleSubmit}>
                <input value={name} placeholder='Name' onChange={(e) => setName(e.target.value)} type='text'></input>
                <input readOnly type='number' value={localStorage.getItem('score')}></input>
                <button id='input'>SAVE</button>
            </form>

            <table className='table'>
                <thead>
                    <tr>
                        <th>RANK</th>
                        <th>NAME</th>
                        <th>SCORE</th>
                    </tr>
                </thead>
                <tbody>
                    {listItems}
                </tbody>
            </table>
        </div>
    )
}

export default Leaderboard
