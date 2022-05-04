import React, { useState, useEffect } from 'react'
import './LeaderboardModal.css';

function LeaderboardModal({score, onClose, resetScore}){
    const [records, setRecords] = useState([]);
    const [nameEmpty, setNameEmpty] = useState(false)

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

    async function onSubmit(e) {  
        if (score > 0){
            e.preventDefault();
            // When a post request is sent to the create url, we'll add a new record to the database.
            const newPerson = { ...form };
            if (form.name === ""){
                setNameEmpty(true)
            } else {
                await fetch("https://martin-nastevski-website.herokuapp.com/leaderboard/add", {
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
                onClose()
                resetScore()
            }
            
        } else {
            //Fixes the refresh bug with the onSubmit when score is === 0
        }
    }

    const Record = (props) => (
        <tr className={getRecordClass(props.index)}>
          <td>{props.index + 1}</td>
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
        } else if (index === records.length -1){
            return "kekw"
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

    useEffect(() => {
        async function getRecords() {
          const response = await fetch(`https://martin-nastevski-website.herokuapp.com/leaderboard`);
      
          if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.alert(message);
            return;
          }
      
          const loadedRecords = await response.json();
          setRecords(loadedRecords);
        }
      
        getRecords();
      
        return;
    }, [records.length]);

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
                        <h5 className='note'>Scores submitted with explicit names associated will be removed</h5>
                        <table>
                            <thead>
                                <tr className='table-titles'>
                                    <th>Rank</th>
                                    <th>Name</th>
                                    <th>Score</th>
                                </tr>
                            </thead>
                            <tbody>{recordList()}</tbody>
                        </table>
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
                            <button 
                                className={score > 0 ? 'button-submit' : 'button-submit-disable'} 
                                onClick={onSubmit}
                            >Submit</button>
                        </form>
                        {nameEmpty && <h5 className='empty-name'>Please submit a name that is not blank</h5>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LeaderboardModal