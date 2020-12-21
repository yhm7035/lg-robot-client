import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import Main from './component/Main'
import KubernetesMain from './component/worker/kubernetes/KubernetesMain'
import DockerMain from './component/worker/docker/DockerMain'

class App extends Component {
  render () {
    return (
      <BrowserRouter>
        <div>
          <Route path="/" component={Main} exact/>
          <Route path="/kubernetes" component={KubernetesMain}/>
          <Route path="/docker" component={DockerMain}/>
        </div>
      </BrowserRouter>
    )
  }
}

export default App
