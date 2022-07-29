import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { db } from '../firebase'
import { useAuth } from '../contexts/AuthContext';
import { ListGroup, Form, Badge } from 'react-bootstrap';

import ContentGrid from './ContentGrid';

export default function Lists() {
  const [error, setError] = useState('')
  const [lists, setLists] = useState([])
  const { currentUser } = useAuth()
  const newListRef = useRef()

  // This does not need to be real time at least not until we have share
  // todos list
  useEffect(() => {
    const fetchLists = async () => {
      const listsQuery = query(
        collection(db, "lists"),
        where("userId", "==", currentUser.uid)
      )
      const dbLists = await getDocs(listsQuery)
      let myLists = [];
      dbLists.forEach(list => myLists.push({ id: list.id, ...list.data() }))
      setLists(myLists)
    }
    fetchLists()
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      setError('')
      const document = await addDoc(collection(db, "lists"), { name: newListRef.current.value, userId: currentUser.uid } );
      setLists([{ name: newListRef.current.value, id: document.id }, ...lists])
      newListRef.current.value = ''
    } catch (error) {
      setError(error.message)      
    }
  }

  const handleKeyPress = event => {
    if (event.key === 'Enter')
      handleSubmit(event)
  }

  const todosCount = (list) => {
    if (!list.todos)
      return 0

    return list.todos.length
  }

  return(
    <ContentGrid>
      <h1>Add List</h1>
      <Form onSubmit={handleSubmit}>
        {error && <span>{error}</span>}
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            name="lists" 
            type="text"
            className={"large-form-input"}
            ref={newListRef}
            onKeyPress={handleKeyPress}
          />
        </Form.Group>
      </Form>
      <ListGroup as="ol" variant="flush">
        {lists.map(list => 
          <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start" key={list.id}>
            <div><Link to={`/lists/${list.id}`}>{list.name}</Link></div>
            <Badge bg="primary" pill>{todosCount(list)}</Badge>
          </ListGroup.Item>)}
      </ListGroup> 
    </ContentGrid>
  )
}
