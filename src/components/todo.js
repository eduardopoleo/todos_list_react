export default function Todo({ text, checked, position, onTextChange }) {
  return(
    <>
      <input type="checkbox" checked={checked}/>
      <input type="text" value={text} onChange={(event) => onTextChange(event, position)}/>
      <br/>
    </>
  )
}