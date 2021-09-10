import React from 'react'
import axios from 'axios'

class DeleteButton extends React.Component {
  constructor (props) {
    super(props)
    this.state = { isHover: false }

    this.handleDeleteButton = this.handleDeleteButton.bind(this)
  }

  handleDeleteButton () {
    const answer = confirm(`Are you sure you want to delete container(${this.props.containerId})?`)

    const cookies = this.props.cookies
    const email = cookies.get('email')

    if (answer) {
      if (this.props.platform === 'kubernetes') {
        axios.post('/run/cluster/undeploy', {
          email,
          address: this.props.address,
          containerId: this.props.containerId,
          clusterName: this.props.name
        }).then(res => {
          alert(res.data.message)
          window.location.reload()
        })
      } else if (this.props.platform === 'docker') {
        axios.post('/run/machine/undeploy', {
          email,
          address: this.props.address,
          containerId: this.props.containerId,
          clusterName: this.props.name
        }).then(res => {
          alert(res.data.message)
          window.location.reload()
        })
      }
    }
  }

  render () {
    return <img draggable='false' className='icon-image-clickable' src='./assets/icons/delete.png' alt='delete' style={{ margin: '24px 0px 0px 26px' }} onClick={this.handleDeleteButton}/>
  }
}

export default DeleteButton
