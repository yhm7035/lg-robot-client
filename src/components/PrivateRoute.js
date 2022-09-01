import React from 'react'
import axios from 'axios'
import { Route, Redirect } from 'react-router-dom'

class PrivateRoute extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      verification: 'null'
    }
  }

  componentDidMount () {
    this.verifyCookie()
  }

  verifyCookie () {
    const { cookies } = this.props
    const session = cookies.get('session')
    const loggedIn = this.props.location.state ? this.props.location.state.loggedIn ? this.props.location.state.loggedIn : false : false

    if (!session) {
      if (loggedIn) {
        this.setState({
          verification: 'failed'
        })
      } else {
        this.setState({
          verification: 'waiting'
        })
      }
    } else {
      axios.post('/auth/verifyCookie', {
        session
      }).then(_ => {
        this.setState({
          verification: 'success'
        })
      }).catch(_ => {
        this.setState({
          verification: 'failed'
        })
      })
    }
  }

  render () {
    const verification = this.state.verification
    const Component = this.props.component

    if (verification === 'success') {
      return (
        <Component {...this.props}/>
      )
    } else if (verification === 'waiting') {
      return (
        <Route>
          <Redirect to="/login" />
        </Route>
      )
    } else {
      return null
    }
  }
}

export default PrivateRoute
