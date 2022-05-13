import React, { useState, useEffect } from 'react'
import './LeaderboardModal.css';

function LeaderboardModal({score, onClose, resetScore, refreshGame}){
    const [records, setRecords] = useState([]);
    const [nameEmpty, setNameEmpty] = useState(false)
    const [loading, setLoading] = useState(false)

    const [form, setForm] = useState({
        name: "",
        score: score,
    });

    function updateForm(value) {
        return setForm((prev) => {
          return { ...prev, ...value };
        });
      }

    const closeOnEsc = (e) => {
        if((e.charCode || e.keyCode) === 27){
            onClose()
        }    
    }

    function refreshModal() {
        onClose()
        refreshGame()
        resetScore()
    }

    async function onSubmit(e) {
        e.preventDefault();
        if (score > 0){
            // When a post request is sent to the create url, we'll add a new record to the database.
            const newPerson = { ...form };
            if (form.name === "" || form.name.trim().length === 0){
                setNameEmpty(true)
            } else {
                await fetch(`https://martin-nastevski-website.herokuapp.com/leaderboard/add`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                    body: JSON.stringify(newPerson),
                })
                .catch(error => {
                    window.alert(error);
                    return;
                });
                
                setNameEmpty(false)
                setForm({ name: "", score: "" });
                getRecords()
                resetScore()
            }
        } 
    }

    const Record = (props) => (
        <tr className={getRecordClass(props.index)}>
          <td>{props.index === records.length - 1 ? 
                <img src={require('../assets/images/kekw.png')} alt={props.index + 1} width={"20px"} height={"20px"}></img> :
                props.index + 1}</td>
          <td>{props.record.name}</td>
          <td>{props.record.score}</td>
        </tr>
    );
    
    function getRecordClass(index){
        if (index === 0){
            return "gold"
        } else if (index === 1){
            return "silver"
        } else if (index === 2){
            return "bronze"
        } else if (index > 9){
            return "grey"
        } else { 
            return
        }
    }
    
    useEffect(() => {
        window.addEventListener('keydown', closeOnEsc)
        return function cleanup() {
            window.removeEventListener('keydown', closeOnEsc)
        }
    }, [])

    async function getRecords() {
        setLoading(true)
        const response = await fetch(`https://martin-nastevski-website.herokuapp.com/leaderboard`);
    
        if (!response.ok) {
            const message = `Hosting service has downtime.
                            \nPlease try re-loading the leaderboard!`;
            window.alert(message);
            return;
        }
        setLoading(false)
    
        const loadedRecords = await response.json();
        setRecords(loadedRecords);
    }

    useEffect(() => {
        getRecords();
        return;
    }, []);

    function recordList() {
        const sortedRecords = records.sort((a, b) => parseFloat(b.score) - parseFloat(a.score));
        return sortedRecords.map((record, index) => {
            return (
                <Record
                    record={record}
                    key={record._id}
                    index={index}
                />
            );
        });
    }

    return (
        <div className='modal' onClick={onClose}>
            <div className='modal-content' onClick={e => e.stopPropagation()}>
                <div className='modal-container'>
                    <div className='modal-header'>
                        <h4 className='modal-title'>Leaderboard</h4>
                        <h4 className='modal-title'>Score: {score}</h4>
                        <button className='button-close' onClick={onClose}>X</button>
                    </div>
                    <div className='modal-body'>
                        <h3 className='note'>Submit your Score below!</h3>
                        <h5 className='note'>Scores submitted with explicit names associated or by cheating will be removed</h5>
                        {loading ? 
                            <h3>
                                Loading Data
                            </h3> :
                            <table>
                            <thead>
                                <tr className='table-titles'>
                                    <th>Rank</th>
                                    <th>Name</th>
                                    <th>Score</th>
                                </tr>
                            </thead>
                            <tbody>{recordList()}</tbody>
                        </table>}
                    </div>
                    <div className='modal-footer'>
                        <form className='form'>
                            {score > 0 && <div>
                                <label>Name:</label>
                                <input
                                    type="text"
                                    id='name'
                                    placeholder="Your Name"
                                    onChange={(e) => updateForm({ name: e.target.value })}
                                />
                            </div>}
                            <div className='submit-refresh'>
                                <button 
                                    className={score > 0 ? 'button-submit' : 'button-submit-disable'} 
                                    onClick={onSubmit}
                                >Submit</button>
                                <img className='refresh-modal' src={require("../assets/images/icons/rotate-right-solid.png")} alt='refresh' onClick={refreshModal} width="20" height="20"></img>     
                            </div>
                            
                        </form>
                        {nameEmpty && <h5 className='empty-name'>Please submit a name that is not blank</h5>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LeaderboardModal