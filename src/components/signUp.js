import { useRef, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function SignUp() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { signUp } = useAuth()
  const navigate = useNavigate()

  const[error, setError] = useState()
  const[loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Password do not match')
    }

    try {
      setError('')
      setLoading(true)
      await signUp(emailRef.current.value, passwordRef.current.value)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      setError(error.message)      
    }
   
    navigate('/lists')
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
        <input type="submit" disabled={loading}/>
      </form> 
    </>
  )
}