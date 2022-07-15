import { useRef, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'

export default function SignUp() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { signUp } = useAuth()

  const[error, setError] = useState()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Password do not match')
    }

    try {
      setError('')
      await signUp(emailRef.current.value, passwordRef.current.value)
    } catch (error) {
      debugger;
      return setError(error.message)      
    }
  }

  return(
    <>
      <h1>Create an Account</h1>
      {error && <span>{error}</span>}
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <br/>
        <input
          name="email"
          type="email"
          ref={emailRef}/>
        <br />

        <label>Password</label>
        <br/>
        <input
          name="password"
          type="password"
          ref={passwordRef}
        />
        <br/>
        <label>Password Confirmation</label>
        <br/>
        <input
          name="passwordConfirmation"
          type="password"
          ref={passwordConfirmRef}
        />

        <br />
        <br />
        <input type="submit"/>
      </form> 
    </>
  )
}