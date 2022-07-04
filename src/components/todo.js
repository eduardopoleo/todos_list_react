export default function Todo({ text, checked, position, onTodoChange }) {
  return(
    <>
      <input type="checkbox" checked={checked} onChange={event => onTodoChange(event, position, 'checked')} />
      <input type="text" value={text} onChange={event => onTodoChange(event, position, 'value')} />
      <br/>
    </>
  )
}