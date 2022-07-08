import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import { db } from '../firebase'
import { getDoc, doc, setDoc } from "firebase/firestore";

import Todo from './todo'

export default function List({ listId }) {
  let params = useParams();
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState('')
  
  useEffect(() => {
    // This call does not stope execution. That's why this function returns a promise
    // even though we write this as a sequential code this is non blocking
    // await will only return real value inside the function because its when the actual
    // call resolves
    // const fetchList = async () => {
    //   const myValue = await getDoc(doc(db, 'lists', params.listId))
    // }

     getDoc(doc(db, 'lists', params.listId)).then((list) => {
      const dbTodos = list.data().todos
      if (dbTodos)
        setTodos(dbTodos)
    })
  }, [])

  const handleCheck = (event, position) => {
    const todo = todos.find((todoItem, index) => index === position)
    todo.done = !todo.done
    const newTodos = [...todos.slice(0, position), todo, ...todos.slice(position + 1)]
    setTodos(newTodos)
    const listDocRef = doc(db, 'lists', params.listId)
    setDoc(listDocRef, {
      todos: newTodos
    },  { merge: true })
  }

  const onAddNewTodo = () => {
    const newTodoEntry = { text: newTodo, done: false  }
    setTodos(
      [newTodoEntry, ...todos]
    )
    setNewTodo('')
      
    const listDocRef = doc(db, 'lists', params.listId)
    setDoc(listDocRef, {
      todos: [...todos, newTodoEntry]
    },  {merge: true })
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
