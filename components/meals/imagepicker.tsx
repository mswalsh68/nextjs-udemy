import classes from './imagepicker.module.css'

export default function ImagePicker() {
  return (
    <div className={classes.picker}>
      <label htmlFor="image">label</label>
      <input type="file" id="image" name="image" accept="image/*" />
    </div>
  )
}
