import { useState } from "react"
import { Link } from 'react-router-dom'

export default function Lists() {
  const [lists, setLists] = useState([
    {
      id: 1,
      name: 'Groceries'
    },
    {
      id: 2,
      name: 'Clothing'
    } 
  ])
  return(
    lists.map(list => <Link
      to={`/lists/${list.id}`}
      key={list.id}>
      <div>{list.name}</div>
    </Link>)
  )
}