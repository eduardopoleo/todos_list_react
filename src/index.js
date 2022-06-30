import { createRoot } from 'react-dom/client'
import { useState } from 'react'
import Todo from './components/todo'

const container = document.getElementById('root')
const root = createRoot(container)

function Todos() {
  const [todos, setTodos] = useState([
    { text: "Clean laundry", checked: false, id: '1'},
    { text: "Take out garbage", checked: true, id: '2'}
  ])

  console.log("todos", todos)
  let allTodos = todos.map((todo) => {
    return <Todo text={todo.text} checked={todo.checked} key={todo.id}/>
  })

  return(
    <>{allTodos}</> 
  )
}

root.render(<Todos />)