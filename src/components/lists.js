import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { db } from '../firebase'
import { useAuth } from '../contexts/AuthContext';
import { Button, Form } from 'react-bootstrap';
import ContentGrid from './ContentGrid';

export default function Lists() {
  const [error, setError] = useState('')
  const [lists, setLists] = useState([])
  const [newList, setNewList] = useState('')
  const { currentUser } = useAuth()
  const listRef = useRef()

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
      const document = await addDoc(collection(db, "lists"), { name: newList, userId: currentUser.uid } );
      setLists([{ name: newList, id: document.id }, ...lists])
      setNewList('')
    } catch (error) {
      setError(error.message)      
    }
  }

  const handleNewListInputChanged = (event) => {
    setNewList(event.target.value)
  }

  const handleKeyPress = event => {
    if (event.key === 'Enter')
    handleSubmit(event)
  }
  return(
    <ContentGrid>
      <Form onSubmit={handleSubmit}>
        {error && <span>{error}</span>}
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            name="lists" 
            type="text"
            placeholder="Add a list"
            ref={listRef}
            onKeyPress={handleKeyPress}
            onChange={handleNewListInputChanged}
          />
        </Form.Group>
      </Form>
      {
        lists.map(list => 
          <div  key={list.id}>
            <Link to={`/lists/${list.id}`}>{list.name}</Link>
          </div>
        )
      }
    </ContentGrid>
  )
}