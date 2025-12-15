'use client'
import { useRef, useState } from 'react';
import classes from './imagepicker.module.css'
import Image from 'next/image';

export default function ImagePicker({label, name}: {label: string; name: string}) {

const imageInput = useRef<HTMLInputElement>(null);
const [pickedImage, setPickedImage] = useState<string | null>(null);  // Assuming you have a state to manage the selected image


  function handleImagePick() {
    imageInput.current?.click()
  }

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file){
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setPickedImage(reader.result as string);  // Set the selected image to the state
    };
    reader.readAsDataURL(file);
    }

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {!pickedImage && <p>No image chosen</p>}
          {pickedImage && (
            <Image src={pickedImage} 
                  alt="Preview" 
                  fill
                  />
          )}
        </div>
        <input 
          className={classes.input}
          type="file" 
          id={name}
          name={name} 
          accept="image/png, image/jpeg, image/jpg"
          ref={imageInput}
          onChange={handleImageChange}
        />
        <button className={classes.button} type="button" onClick={handleImagePick} >
          Choose Image
        </button>
      </div>
    </div>
  )
}
