import { useState, useEffect } from 'react';
import { storage } from '../firebaseConfig';
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';

// uploading pictures to firebase page
function Pictures() {
    const [imageUpload, setImageUpload] = useState(null);
    const [imageList, setImageList] = useState([]);

    const imageListRef = ref(storage, "images/")
    
    const uploadImage = () => {
        if (imageUpload == null) {
            return;
        }
        //const storage = getStorage();
        const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
        console.log('imageRef: ' + imageRef);
        uploadBytes(imageRef, imageUpload).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                setImageList((prev) => [...prev, url])
            });
        }, (error) => {
            console.error('error uploading image', error);
        })
    }

    useEffect(() => {
        const fetchImages = async () => {

            await listAll(imageListRef).then((response) => {
                //console.log(response); 
                response.items.forEach((item) => {
                    getDownloadURL(item).then((url) => {
                        setImageList((prev) => [...prev, url]);
                    })
                })
            })
            console.log('triggered!')
        };

        fetchImages()
    }, [])

    return (
        <div>
            <h1>UPLOAD PICTURES</h1>

            <div className='App'>
                <input type="file" onChange={(event) => { setImageUpload(event.target.files[0])}} />
                <button onClick={uploadImage}>Upload Image</button>

                {imageList.map((url) => {
                    return <img src={url} />
                })}
            </div>
        </div>
    )
}

export default Pictures;