import React from 'react'

const AuthContext = React.createContext({
  authInfo: {
    userId: null,
    userEmail: null,
    idToken: null,
    isSignedIn: false,
    org: null
  }
})

export default AuthContext
