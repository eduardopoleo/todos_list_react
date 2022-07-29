export default function Todo({ text, checked, position, onTodoChange }) {
  return(
    <>
      <label className="form-control-2">
        <input type="checkbox" checked={checked} onChange={event => onTodoChange(event, position, 'checked')} />
        {text}
      </label>
      <br/>
    </>
  )
}