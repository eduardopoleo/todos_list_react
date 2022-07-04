import { createRoot } from 'react-dom/client'
import { useState } from 'react'
import Todo from './components/todo'

const container = document.getElementById('root')
const root = createRoot(container)

function Todos() {
  const [uncheckedTodos, setUncheckedTodos] = useState([
    { value: "Cook dinner", checked: false},
    { value: "Feed the cat", checked: false}
  ])

  const [checkedTodos, setCheckedTodos] = useState([
    { value: "Clean windows", checked: true},
    { value: "Take out garbage", checked: true}
  ])

  const [newTodo, setNewTodo] = useState('')

  const handleCheck = (event, position) => {
    const todoItem = uncheckedTodos.find((todo, index) => index === position)
    todoItem.checked = true
    setCheckedTodos([todoItem, ...checkedTodos])
    setUncheckedTodos([...uncheckedTodos.slice(0, position), ...uncheckedTodos.slice(position + 1)])
  }

  const handleUnCheck = (event, position ) => {
    const todoItem = checkedTodos.find((todo, index) => index === position)
    todoItem.checked = false
    setUncheckedTodos([...uncheckedTodos, todoItem])
    setCheckedTodos([...checkedTodos.slice(0, position), ...checkedTodos.slice(position + 1)])
  }

  const onAddNewTodo = () => {
    const newTodoEntry = { value: newTodo, checked: false }

    setUncheckedTodos(
      [newTodoEntry, ...uncheckedTodos]
    )

    setNewTodo('')
  }

  const onNewTodoChanged = (event) => {
    setNewTodo(event.target.value)
  }

  const handleKeyPress = event => {
    if (event.key === 'Enter')
      onAddNewTodo()
  }

  return(
    <>
      <input 
        type="text"
        value={newTodo}
        onChange={onNewTodoChanged}
        onKeyPress={handleKeyPress}
      />
      <button onClick={onAddNewTodo}>Add todo</button>
      <br/>
      {
        uncheckedTodos.map((todo, index) => {
          return <Todo 
            text={todo.value}
            checked={todo.checked}
            key={index}
            position={index}
            onTodoChange={handleCheck} 
          />
        })
      }

      <hr/>
      {
        checkedTodos.map((todo, index) => {
          return <Todo 
            text={todo.value}
            checked={todo.checked}
            key={index}
            position={index}
            onTodoChange={handleUnCheck} 
          />
        })
      }
    </>
  )
}

root.render(<Todos />)