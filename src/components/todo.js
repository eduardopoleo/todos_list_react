export default function Todo({ text, checked }) {
  return(
    <>
      <input type="checkbox" checked={checked}/>
      <input type="text" value={text}/>
    </>
  )
}