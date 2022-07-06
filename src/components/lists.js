import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore"; 

const firebaseConfig = {
  apiKey: "AIzaSyDiFemQgvz_sDf3iziKaaqY0wAbE9ecbco",
  authDomain: "todosreact-a18e8.firebaseapp.com",
  projectId: "todosreact-a18e8",
  storageBucket: "todosreact-a18e8.appspot.com",
  messagingSenderId: "206861045069",
  appId: "1:206861045069:web:fd67de15b3180e2c38fb04",
  measurementId: "G-313XXJYC4L"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function Lists() {
  const [lists, setLists] = useState([])
  const [newList, setNewList] = useState('')

  useEffect(() => {
    const fetchLists = async () => {
      let dbLists = await getDocs(collection(db, "lists"));
      let myLists = [];
      dbLists.forEach((list) => myLists.push({ id: list.id, ...list.data() }))
      console.log("myLists", myLists)
      setLists(myLists)
    }

    fetchLists()
    console.log("lists", lists)
  }, [])

  let id;
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