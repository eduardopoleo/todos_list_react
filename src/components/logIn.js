import { useRef, useState } from 'react'
import { useAuth } from "../contexts/AuthContext"
import { useNavigate } from 'react-router-dom'
import { Button, Form } from 'react-bootstrap';
import ContentGrid from './ContentGrid';

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
    <ContentGrid>
      <Form onSubmit={handleSubmit}>
        <h1>Log In</h1>
        {error && <span>{error}</span>}
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control name="email" type="email" placeholder="example@.com" ref={emailRef}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control name="password" type="password" placeholder="Choose a strong password" ref={passwordRef}/>
        </Form.Group>

        <Button variant="primary" type="submit">Log In</Button>
      </Form>
    </ContentGrid>
  )  
}
