export default function Todo({ text, checked, position, onTodoChange }) {
  return(
    <>
      <label class="form-control-2">
        <input type="checkbox" checked={checked} onChange={event => onTodoChange(event, position, 'checked')} />
        {text}
      </label>
      <br/>
    </>
  )
}