import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

let id = 2
export default function Lists() {
  const [lists, setLists] = useState([])
  const [newList, setNewList] = useState('')
  const fetchedlists = [
    { id: 1, name: 'Groceries' },
    { id: 2, name: 'Clothing' } 
  ]

  useEffect(() => {
    setLists(fetchedlists)    
  }, [])

  const onAddNewList = () => {
    id++
    const newListEntry = { name: newList, id: id }

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