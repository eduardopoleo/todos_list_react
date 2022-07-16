import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from '../firebase'

export default function Lists() {
  const [lists, setLists] = useState([])
  const [newList, setNewList] = useState('')

  // This does not need to be real time at least not until we have share
  // todos list
  useEffect(() => {
    const fetchLists = async () => {
      const dbLists = await getDocs(collection(db, "lists"));
      let myLists = [];
      dbLists.forEach((list) => myLists.push({ id: list.id, ...list.data() }))
      setLists(myLists)
    }
    fetchLists()
  }, [])

  const handleAddNewList = async () => {
    const document = await addDoc(collection(db, "lists"), { name: newList } );
    setLists([{ name: newList, id: document.id }, ...lists])
    setNewList('')
  }

  const handleNewListInputChanged = (event) => {
    setNewList(event.target.value)
  }

  const handleKeyPress = event => {
    if (event.key === 'Enter')
    handleAddNewList()
  }
  return(
    <>
      <input 
        type="text"
        value={newList}
        onChange={handleNewListInputChanged}
        onKeyPress={handleKeyPress}/>
      <button onClick={handleAddNewList}>Add List</button>
      <br/>
      {
        lists.map(list => 
          <div  key={list.id}>
            <Link to={`/lists/${list.id}`}>{list.name}</Link>
          </div>
        )
      }
    </>
  )
}