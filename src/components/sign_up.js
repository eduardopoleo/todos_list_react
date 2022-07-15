import { useState, useEffect } from 'react'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase'
import { onAuthStateChanged } from 'firebase/auth'

export default function SignUp() {
  const [inputs, setInputs] = useState({})

  const handleSignUp = (event) => {
    event.preventDefault()
    createUserWithEmailAndPassword(auth, inputs.email, inputs.password)
    .then((userCredential) => {
      console.log('User logged in')
      setInputs({name: '', password: ''})
    })
    .catch(error => {
      const errorCode = error.code
      const errorMessage = error.message
      console.log(`error ${errorMessage} with code: ${errorCode}`)
    })

  }

  const handleInputChange = (event) => {
    const field = event.target.name
    const value = event.target.value

    setInputs({
      ...inputs,
      ...{[field]: value}
    })
  }

  const myComponent = () => {
    return(
      <>
        <h1>Create an Account</h1>
        <form onSubmit={handleSignUp}>
          <label>Email</label>
          <br/>
          <input
            name="email"
            type="email"
            value={inputs.email || ""}
            onChange={handleInputChange} />
          <br />

          <label>Password</label>
          <br/>
          <input
            name="password"
            type="password"
            value={inputs.password || ""}
            onChange={handleInputChange} />
          <br />
          <br />
          <input type="submit"/>
        </form> 
      </>
    )
  }
  console.log('user', currentUser)
  return currentUser ? myComponent() : <h1>You're already logged in silly </h1>
}