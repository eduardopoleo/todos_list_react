import { createRoot } from 'react-dom/client'
import { useState } from 'react'
import Todo from './components/todo'

const container = document.getElementById('root')
const root = createRoot(container)


function Todos() {
  const [todos, setTodos] = useState([
    { text: "Clean laundry", checked: false, position: '1'},
    { text: "Take out garbage", checked: true, position: '2'}
  ])

  const onTextChange = (event, position) => {
    debugger;
    const todo = todos.find((todo) => todo.position === position)

    setTodos(
      [...todos.slice(0, position), todo, ...todos.slice(position + 1)]
    )
  }

  let allTodos = todos.map((todo, index) => {
    return <Todo 
      text={todo.text}
      checked={todo.checked}
      key={index}
      position={index}
      onTextChange={onTextChange} 
    />
  })

  return(
    <>{allTodos}</> 
  )
}

root.render(<Todos />)