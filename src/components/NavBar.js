import { Container, Navbar, Nav }from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function NavBar() {
  const { currentUser, logout } = useAuth()

  return (
    <>
      <Navbar bg="light" variant="light">
        <Container fluid>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src="/logo.png"
              width="130"
              height="30"
              className="d-inline-block align-top"
            />{' '}
          </Navbar.Brand>
          <Nav>
            {currentUser ? (
              <>
                <Nav.Link href="#home"><Link to="/lists">Lists</Link></Nav.Link>
                <Nav.Link href="#home"><a href="#" onClick={logout}>Log Out</a></Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link href="#home"><Link to="/login">Log In</Link></Nav.Link>
                <Nav.Link href="#home"><Link to="/signup">Sign Up</Link></Nav.Link>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}
