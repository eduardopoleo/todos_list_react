import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from '../firebase'

export default function Lists() {
  const [lists, setLists] = useState([])
  const [newList, setNewList] = useState('')

  useEffect(() => {
    const fetchLists = async () => {
      let dbLists = await getDocs(collection(db, "lists"));
      let myLists = [];
      dbLists.forEach((list) => myLists.push({ id: list.id, ...list.data() }))
      setLists(myLists)
    }
    fetchLists()
  }, [])

  const onAddNewList = () => {
    const newListEntry = { name: newList }
    console.log('weird', newListEntry)
    const saveList = async (newListEntry) => {
      console.log('weird2', newListEntry)
      return await addDoc(collection(db, "lists"), { ...newListEntry } );
    }
    const result = saveList()
    console.log('final result ', result)
    setLists([newListEntry, ...lists])

    setNewList('')
  }

  const onNewListChanged = (event) => {
    setNewList(event.target.value)
  }

  const handleKeyPress = event => {
    if (event.key === 'Enter')
      onAddNewList()
  }
  return(
    <>
      <input 
        type="text"
        value={newList}
        onChange={onNewListChanged}
        onKeyPress={handleKeyPress}/>
      <button onClick={onAddNewList}>Add List</button>
      <br/>
      {
        lists.map(list => <Link
          to={`/lists/${list.id}`}
          key={list.id}>
          <div>{list.name}</div>
        </Link>)
      }
    </>
  )
}