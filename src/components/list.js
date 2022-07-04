import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";

import Todo from './todo'

export default function List({ listId }) {
  let params = useParams();
  const [todos, setTodos] = useState([])
  const fetchedTodos = [
    { listId: 1, text: 'Onions', done: true },
    { listId: 1, text: 'Carrots', done: false },
    { listId: 2, text: 'Shoes', done: false },
    { listId: 2, text: 'Tshirt', done: true },
    { listId: 2, text: 'jeans', done: false }
  ]
  
  useEffect(() => {
    // These will be fetched from the server
    setTodos(fetchedTodos.filter(todo => todo.listId == params.listId))
  }, [])

  const [newTodo, setNewTodo] = useState('')

  const handleCheck = (event, position) => {
    const todo = todos.find((todoItem, index) => index === position)
    todo.done = true

    setTodos([...todos.slice(0, position), todo, ...todos.slice(position + 1)])
  }

  const onAddNewTodo = () => {
    const newTodoEntry = { text: newTodo, done: false, listId: params.listId }

    setTodos(
      [newTodoEntry, ...todos]
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
        todos.map((todo, index) => {
          return <Todo 
            text={todo.text}
            checked={todo.done}
            key={index}
            position={index}
            onTodoChange={handleCheck} 
          />
        })
      }
    </>
  )
}
