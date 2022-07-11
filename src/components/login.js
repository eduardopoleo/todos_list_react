import { useState } from 'react'
import { appAuth } from '../firebase'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { fireBaseApp } from '../firebase'

export default function Login() {
  const [inputs, setInputs] = useState({})
  
  const handleLogin = (event) => {
    event.preventDefault()
    const auth = getAuth(fireBaseApp);
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

  return (
    <>
      <form onSubmit={handleLogin}>
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