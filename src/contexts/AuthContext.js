import React, { useContext, useEffect, useState } from 'react'
import { auth } from '../firebase'
// see if we can use the firebase file as a proxy for all the method
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth'

// 1) create context
const AuthContext = React.createContext()

// 3) last UseContext to declare that we want to use the context
export function useAuth() {
  return useContext(AuthContext)
}

// 2) Create the provider with respective vallues
export function AuthProvider({ children }) {
  const[currentUser, setCurrentUser] = useState()
  const[loading, setLoading] = useState(true)
  
  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
  }

  function logout(){
    return signOut(auth)
  }
  
  useEffect(() => {
    // this is just weirdness of this api which returns
    // a function used to unsubscribe the listener
    // This pairs up really nicely with useeffect because it has
    // the same behaviour
    return onAuthStateChanged(auth, user => {
      setLoading(false)
      setCurrentUser(user)
    })
  }, [])
  
  // The provider will include the values to pass down
  const value =  {
    currentUser,
    signUp,
    login,
    logout
  }

  // These values are passed as value={}
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export default AuthContext