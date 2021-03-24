import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Main from './components/Main'
import KubernetesMain from './components/worker/kubernetes/KubernetesMain'
import DockerMain from './components/worker/docker/DockerMain'
import Login from './components/Login'
import AuthProvider from './contexts/AuthProvider'
import PrivateRoute from './components/PrivateRoute'
import { withCookies } from 'react-cookie'

class App extends Component {
  render () {
    return (
      <Router>
        <AuthProvider>
          <Switch>
            <Route path="/login" component={Login} exact/>
            <PrivateRoute path="/" component={Main} cookies={this.props.cookies} exact/>
            <PrivateRoute path="/kubernetes" component={KubernetesMain} cookies={this.props.cookies}/>
            <PrivateRoute path="/docker" component={DockerMain} cookies={this.props.cookies}/>
          </Switch>
        </AuthProvider>
      </Router>
    )
  }
}

export default withCookies(App)
