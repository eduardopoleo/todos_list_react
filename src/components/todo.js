export default function Todo({ text, checked, position, onTodoChange }) {
  return(
    <>
      <input type="checkbox" checked={checked} onChange={event => onTodoChange(event, position, 'checked')} />
      <span>{text}</span>
      <br/>
    </>
  )
}