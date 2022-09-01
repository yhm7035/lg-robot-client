import React, { useContext } from 'react'
import AuthContext from '../contexts/AuthContext'
import { Route, Redirect } from 'react-router-dom'
import { signInWithPopup } from 'firebase/auth'

import { auth, provider } from '../firebase'

class Login extends React.Component {
  componentDidMount () {
    this.login()
  }

  login () {
    signInWithPopup(auth, provider)
      .catch(err => {
        console.log(err)
      })
  }

  render () {
    return (
      <AuthContext.Consumer>
        {({ isSignedIn }) => {
          if (isSignedIn) {
            return (
              <Route>
                <Redirect to={ { pathname: '/', state: { loggedIn: true } } }/>
              </Route>
            )
          } else {
            return null
          }
        }}
      </AuthContext.Consumer>
    )
  }
}

export default Login
