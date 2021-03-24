import React from 'react'
import axios from 'axios'
import { auth } from '../firebase'
import AuthContext from './AuthContext'

let firebaseUnsubscribe

class AuthProvider extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      authInfo: {
        userId: null,
        userEmail: null,
        idToken: null,
        isSignedIn: false,
        org: null,
      }
    }
  }

  componentDidMount () {
    firebaseUnsubscribe = auth.onAuthStateChanged(async (user) => {
      try {
        // Login
        if (user) {
          const idToken = await user.getIdToken(
            /* forceRefresh */ true
          )

          axios.post('/auth/login', { idToken }, { withCredentials: true })
            .then(res => {
              const data = res.data

              if (data.status === 'success') {
                this.setState({
                  authInfo: {
                    userId: user.uid,
                    userEmail: user.email,
                    idToken: idToken,
                    isSignedIn: true,
                    org: data.org,
                  }
                })
              }
            })
            .catch(_ => {
              alert('error: permission required')
            })
        }
      } catch (err) {
        console.log(err)
      }
    })
  }

  componentWillUnmount () {
    if (firebaseUnsubscribe) {
      firebaseUnsubscribe()
    }
  }

  render () {
    const { authInfo } = this.state

    return (
      <AuthContext.Provider value={authInfo}>
        {this.props.children}
      </AuthContext.Provider>
    )
  }
}

export default AuthProvider
