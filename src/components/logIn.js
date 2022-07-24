export default Login() {
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