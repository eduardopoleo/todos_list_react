import { useState, useEffect, useRef } from 'react'
import { useParams } from "react-router-dom"
import { db } from '../firebase'
import { getDoc, doc, setDoc } from "firebase/firestore"
import ContentGrid from './ContentGrid'
import { Form } from 'react-bootstrap';

import Todo from './todo'

export default function List() {
  let params = useParams();
  const [todos, setTodos] = useState([])
  const [list, setList] = useState({})
  const newTodoRef = useRef()

  const fetchListInfo = async () => {
    const dbList = await getDoc(doc(db, 'lists', params.listId))
    setList(dbList.data())
    if (dbList.data().todos)
      setTodos(dbList.data().todos)
  }
  
  useEffect(() => {
    fetchListInfo()
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

  const handleSubmit = (event) => {
    event.preventDefault()

    const newTodoEntry = { text: newTodoRef.current.value, done: false  }
    setTodos(
      [newTodoEntry, ...todos]
    )
    newTodoRef.current.value = ''
    const listDocRef = doc(db, 'lists', params.listId)
    setDoc(listDocRef, {
      todos: [...todos, newTodoEntry]
    },  { merge: true })
  }

  const handleKeyPress = event => {
    if (event.key === 'Enter')
      handleSubmit(event)
  }

  return(
    <>
      <ContentGrid>
        <h1 className='text-center'>{list.name}</h1>
        <br/>
        <h3>Add Todo</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              name="new-todo"
              type="text"
              className={"large-form-input"}
              ref={newTodoRef}
              onKeyPress={handleKeyPress}
            />
          </Form.Group>
        </Form>
        <br/>
        {
          todos && todos.map((todo, index) => {
            return <Todo 
              text={todo.text}
              checked={todo.done}
              key={index}
              position={index}
              onTodoChange={handleCheck} 
            />
          })
        }
      </ContentGrid>
    </>
  )
}
