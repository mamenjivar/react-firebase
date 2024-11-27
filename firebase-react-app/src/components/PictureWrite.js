import { useState, useEffect } from 'react';
import {app} from "../firebaseConfig";
import { getDatabase, ref, set, push } from "firebase/database";
import { storage } from '../firebaseConfig';
import { ref as fer, uploadBytes, listAll, getDownloadURL } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';

function PictureWrite() {
    const navigate = useNavigate();

    const [imageUpload, setImageUpload] = useState(null);
    const [imageList, setImageList] = useState([]);
    let [inputValue1, setInputValue1] = useState('');
    let [inputValue2, setInputValue2] = useState('');

    //const imageListRef = fer(storage, "images/");

    const saveData = async () => {
        // upload image
        if(imageUpload == null) {
            return;
        }

        const imageRef = fer(storage, `images/${imageUpload.name}`);
        uploadBytes(imageRef, imageUpload).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                const db = getDatabase(app);
                const newDocRef = push(ref(db, "nature/fruits"));
                set(newDocRef, {
                    fruitName: inputValue1,
                    fruitDefinition: inputValue2,
                    profilePicture: url
                }).then(() => {
                    alert('data saved successfully');
                }).catch((error) => {
                    alert("error: ", error.message);
                })
            });
        }, (error) => {
            console.log('error uploading image', error);
        })

        // const db = getDatabase(app);
        // const newDocRef = push(ref(db, "nature/fruits"));
        // set(newDocRef, {
        //     fruitName: inputValue1,
        //     fruitDefinition: inputValue2
        // }).then(() => {
        //     alert('data saved successfully');
        // }).catch((error) => {
        //     alert("error: ", error.message);
        // })
    }
    return (
        <div>
            <h1>WRITE and UPLOAD PICTURES</h1>

            <label>Upload Image:</label>
            <input type="file" onChange={(event) => { setImageUpload(event.target.files[0])}} /><br />

            <label>Fruit name:</label>
            <input type='text' value={inputValue1} onChange={(e) => setInputValue1(e.target.value)}/><br />

            <label>Fruit definition:</label>
            <input type='text' value={inputValue2 } onChange={(e) => setInputValue2(e.target.value)}/> <br />

            <button onClick={saveData}>SAVE DATA</button><br />

            <button className='button1' onClick={ () => navigate("/")}>GO HOMEPAGE</button> <br  />
            <button className='button1' onClick={ () => navigate("/updateread")}>GO READ PAGE</button>
        </div>
    )
}

export default PictureWrite;