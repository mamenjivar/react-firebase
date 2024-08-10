import React, { useState, useEffect } from 'react';
import app from "../firebaseConfig";
import { getDatabase, ref, set, get } from "firebase/database";
import { useNavigate, useParams } from 'react-router-dom';

function UpdateWrite() {
    const navigate = useNavigate();
    const {firebaseId} = useParams();

    let [inputValue1, setInputValue1] = useState('');
    let [inputValue2, setInputValue2] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const db = getDatabase(app);
            const dbRef = ref(db, "nature/fruits/"+firebaseId);
            const snapshot = await get(dbRef);
            if(snapshot.exists()) {
                const targetObject = snapshot.val();
                setInputValue1(targetObject.fruitName);
                setInputValue2(targetObject.fruitDefinition);
            } else {
                alert("error");
            }
        }
        fetchData();
    }, [firebaseId])

    const overwriteData = async () => {
        const db = getDatabase(app);
        const newDocRef = ref(db, "nature/fruits/"+firebaseId);
        set(newDocRef, {
            fruitName: inputValue1,
            fruitDefinition: inputValue2
        }).then(() => {
            alert('data saved successfully');
        }).catch((error) => {
            alert("error: ", error.message);
        })
    }
    return (
        <div>
            <h1>UPDATE-WRITE</h1>
            <input type='text' value={inputValue1} onChange={(e) => setInputValue1(e.target.value)}/>

            <input type='text' value={inputValue2 } onChange={(e) => setInputValue2(e.target.value)}/> <br />

            <button onClick={overwriteData}>UPDATE</button>

            <button className='button1' onClick={ () => navigate("/")}>GO HOMEPAGE</button> <br  />
            <button className='button1' onClick={ () => navigate("/updateread")}>GO READ PAGE</button>
        </div>
    )
}

export default UpdateWrite;