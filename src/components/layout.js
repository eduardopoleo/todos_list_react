import { Children } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom'

export default function Layout({ children }) {
  const { currentUser, logout } = useAuth()

  return(
    <>
      <nav>
        <ul>
          <li>About</li>
          {currentUser && <li><a onClick={logout}>Log Out</a></li>}
          {currentUser && <li>{currentUser.email}</li>}
          {!currentUser && <li> <Link to="login">Log In</Link></li>}
          {!currentUser && <li> <Link to="sign_up">Sign Up</Link></li>}
        </ul>      
      </nav>
      <br/>
      <br/>
      <main>{children}</main>
      <br/>
      <br/>
      <div>This is some sort of footer</div>
    </>
  )
}