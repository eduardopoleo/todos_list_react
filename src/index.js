import { createRoot } from 'react-dom/client'
import { useState } from 'react'
import Todo from './components/todo'

const container = document.getElementById('root')
const root = createRoot(container)


function Todos() {
  const [todos, setTodos] = useState([
    { value: "Clean laundry", checked: false},
    { value: "Take out garbage", checked: true}
  ])

  const onTodoChange = (event, position, property) => {
    const todo = todos.find((todo, index) => index === position)
    todo[property] = event.target[property]

    setTodos(
      [...todos.slice(0, position), todo, ...todos.slice(position + 1)]
    )
  }

  let allTodos = todos.map((todo, index) => {
    return <Todo 
      text={todo.value}
      checked={todo.checked}
      key={index}
      position={index}
      onTodoChange={onTodoChange} 
    />
  })

  return(
    <>{allTodos}</> 
  )
}

root.render(<Todos />)