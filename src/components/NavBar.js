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
                <Link className='nav-link' to="/lists">Lists</Link>
                <a className='nav-link' href="#" onClick={logout}>Log Out</a>
              </>
            ) : (
              <>
                <Link className='nav-link' to="/login">Log In</Link>
                <Link className='nav-link' to="/signup">Sign Up</Link>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}
