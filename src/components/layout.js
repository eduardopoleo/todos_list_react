import NavBar from './NavBar';
import './application.css';

export default function Layout({ children }) {
  return(
    <>
      <nav>
        <NavBar />
      </nav>
      <br/>
      <br/>
      <main>{children}</main>
    </>
  )
}