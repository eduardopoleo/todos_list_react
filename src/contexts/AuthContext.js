import React, { useContext, useEffect, useState } from 'react'
import { auth } from '../firebase'
// see if we can use the firebase file as a proxy for all the method
import { createUserWithEmailAndPassword, onAuthStateChanged  } from 'firebase/auth'

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const[currentUser, setCurrentUser] = useState()
  
  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
  }
  
  useEffect(() => {
    // this is just weirdness of this api which returns
    // a function used to unsubscribe the listener
    // This pairs up really nicely with useeffect because it has
    // the same behaviour
    return onAuthStateChanged(auth, user => {
      setCurrentUser(user)
    })
  }, [])
  
  const value =  {
    currentUser,
    signUp
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext