import { useRef, useState } from 'react'
import { useAuth } from "../contexts/AuthContext"
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const navigate = useNavigate()
  const { login } = useAuth()

  const[error, setError] = useState()
  const[loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setError('')
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      setError(error.message)      
    }
    navigate('/lists')
  }

  return(
    <>
    <h1>Log In</h1>
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
      <br />
      <br />
      <input type="submit" disabled={loading}/>
    </form> 
  </>
  )  
}