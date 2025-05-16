'use client';

import { useRef, useState } from 'react'
import Image from 'next/image';

import classes from './image-picker.module.css'

export default function ImagePicker({ label, name }) {
    const [pickedImage, setPickedImage] = useState();

    const pickerRef = useRef();

    function handlePickClick() {
        pickerRef.current.click();
    }

    const handleImageChange = (event) => {
        const file = event.target.files[0];

        if (!file) {
            setPickedImage(null);
            return;
        }

        const fileReader = new FileReader();

        fileReader.onload = () => {
            setPickedImage(fileReader.result)
        }

        fileReader.readAsDataURL(file);
    }

    return (
        <div className={classes.picker}>
            <label htmlFor={name}>{label}</label>
            <div className={classes.controls}>
                <div className={classes.preview}>
                    {!pickedImage ?
                        <p>No image picked yet.</p> :
                        (
                            <Image src={pickedImage} alt="Image picked by the user" fill />
                        )
                    }
                </div>
                <input
                    className={classes.input}
                    id={name}
                    type='file'
                    name={name}
                    accept='image/png, image/jpeg'
                    ref={pickerRef}
                    onChange={handleImageChange}
                    required
                />
                <button onClick={handlePickClick} className={classes.button} type='button'>
                    Pick an image
                </button>
            </div>
        </div>
    )
}