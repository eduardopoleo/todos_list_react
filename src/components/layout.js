import NavBar from './NavBar';

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
      <div>This is some sort of footer</div>
    </>
  )
}