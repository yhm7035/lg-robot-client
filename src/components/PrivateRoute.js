import React from 'react'
import axios from 'axios'
import { Route, Redirect } from 'react-router-dom'

class PrivateRoute extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      verification: 'waiting'
    }
  }

  componentDidMount () {
    this.verifyCookie()
  }

  verifyCookie () {
    const cookies = this.props.cookies
    const session = cookies.get('session')

    if (!session) {
      this.setState({
        verification: 'null'
      })
    } else {
      axios.post('/auth/verifyCookie', {
        session
      }).then(_ => {
        this.setState({
          verification: 'success'
        })
      }).catch(_ => {
        this.setState({
          verification: 'fail'
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
    } else if (verification === 'null') {
      return (
        <Route>
          <Redirect to="/login" />
        </Route>
      )
    } else if (verification === 'fail') {
      return null
    } else if (verification === 'waiting') {
      return null
    }
  }
}

export default PrivateRoute
