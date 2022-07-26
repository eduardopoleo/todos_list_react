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
      <br/>
      <br/>
      <footer className='footer mt-auto py-3 bg-light'>
        <span className="text-muted">Place sticky footer content here.</span>
      </footer>
    </>
  )
}