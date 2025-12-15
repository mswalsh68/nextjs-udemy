'use client'
import { useRef } from 'react';
import classes from './imagepicker.module.css'

export default function ImagePicker({label, name}: {label: string; name: string}) {

const imageInput = useRef<HTMLInputElement>(null);

  function handleImagePick() {
    imageInput.current?.click()
  }

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div>
        <input 
          className={classes.input}
          type="file" 
          id={name}
          name={name} 
          accept="image/png, image/jpeg" 
          ref={imageInput}
        />
        <button className={classes.button} type="button" onClick={handleImagePick}>
          Choose Image
        </button>
      </div>
    </div>
  )
}
