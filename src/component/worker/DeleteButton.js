import React from 'react'

class DeleteButton extends React.Component {
  constructor (props) {
    super(props)
    this.state = { isHover: false }

    this.handleDeleteButton = this.handleDeleteButton.bind(this)
  }

  handleDeleteButton () {
    const answer = confirm(`Are you sure you want to delete container(${this.props.containerId})?`)

    if (answer) {
      if (this.props.platform === 'kubernetes') {
        fetch('/run/cluster/undeploy', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            address: this.props.address,
            containerId: this.props.containerId,
            clusterName: this.props.name
          }),
        })
          .then(response => response.json())
          .then(data => alert(data.message))
      } else if (this.props.platform === 'docker') {
        fetch('/run/machine/undeploy', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            address: this.props.address,
            containerId: this.props.containerId,
            clusterName: this.props.name
          }),
        })
          .then(response => response.json())
          .then(data => alert(data.message))
      }
    }
  }

  sendDeleteRequest () {
    fetch('/run/cluster/undeploy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        address: this.props.address,
        containerId: this.props.containerId,
        clusterName: this.props.name
      }),
    })
      .then(response => response.json())
      .then(data => alert(data.message))
  }

  render () {
    return <img draggable='false' className='icon-image-clickable' src='./assets/icons/delete.png' alt='delete' style={{ margin: '24px 0px 0px 26px' }} onClick={this.handleDeleteButton}/>
  }
}

export default DeleteButton
