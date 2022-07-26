import { useRef, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { Button, Form, Container, Row, Col } from 'react-bootstrap';

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
    <Container>
      <Row>
        <Col></Col>
        <Col>
          <Form onSubmit={handleSubmit}>
            <h1>Sign Up</h1>
            {error && <span>{error}</span>}
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control name="email" type="email" placeholder="example@.com" ref={emailRef}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control name="password" type="password" placeholder="Choose a strong password" ref={passwordRef}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control name="passwordConfirmation" type="password" placeholder="Confirm your password" ref={passwordConfirmRef}/>
            </Form.Group>

            <Button variant="primary" type="submit">Sign Up</Button>
          </Form>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  )
}
