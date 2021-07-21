import React from 'react'
import axios from 'axios'

class DeployTemplate extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      image: '',
      port: ''
    }

    this.handleImageChange = this.handleImageChange.bind(this)
    this.handlePortChange = this.handlePortChange.bind(this)
    this.sendDeployRequest = this.sendDeployRequest.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleImageChange (event) {
    this.setState({
      image: event.target.value
    })
  }

  handlePortChange (event) {
    this.setState({
      port: event.target.value
    })
  }

  sendDeployRequest (image, port) {
    const cookies = this.props.cookies
    const email = cookies.get('email')
    const ports = port.split(',')

    const intPorts = []

    if (this.props.platform === 'kubernetes') {
      for (let i = 0; i < ports.length; i++) {
        const num = parseInt(ports[i])

        if (isNaN(num)) {
          alert('port has to be a number')
          return
        }

        intPorts.push(num)
      }

      axios.post('/run/cluster/deploy', {
        address: this.props.address,
        email,
        imageName: image,
        ports: intPorts,
        clusterName: this.props.name
      }).then(res => {
        alert(res.data.message)
      })
    } else if (this.props.platform === 'docker') {
      axios.post('/run/machine/deploy', {
        address: this.props.address,
        email,
        imageName: image,
        clusterName: this.props.name
      }).then(res => {
        alert(res.data.message)
      })
    }
  }

  handleSubmit (event) {
    const image = this.state.image
    const port = this.state.port
    this.sendDeployRequest(image, port)

    this.setState({
      image: '',
      port: ''
    })

    event.preventDefault()
  }

  render () {
    return (
      <div className='deploy-template'>
        <div style={{ display: 'flex', flexDirection: 'row', position: 'absolute', width: '976px', height: '40px', left: '27px', top: '20px' }}>
          <div style={{ position: 'absolute', width: '134px', height: '24px', top: '8px', left: '0px', order: 0 }}>
            {/* add icon */}
            <img draggable='false' className='icon-image' style={{ position: 'absolute', left: '0px', top: '0px' }} src="./assets/icons/add.png" alt="add_icon"/>
            <div style={{ position: 'absolute', left: '28px', top: '1px', fontFamily: 'Roboto', fontStyle: 'normal', fontWeight: 'bold', fontSize: '16px', lineHeight: '24px', color: '#333333' }}>
              Add container:
            </div>
          </div>

          {/* deploy template */}
          { this.props.platform === 'kubernetes'
            ? <>
              <div style={{ position: 'absolute', width: '563px', height: '40px', left: '152px', top: '0px', order: 1 }}>
                <div style={{ position: 'absolute', height: '24px', left: '0px', top: '9px', fontFamily: 'Roboto', fontStyle: 'normal', fontWeight: 'normal', fontSize: '16px', lineHeight: '24px', color: '#333333' }}>
                    Image
                </div>
                <input style={{ width: '507px', fontFamily: 'Roboto', fontStyle: 'normal', fontWeight: 'normal', fontSize: '16px', lineHeight: '24px', position: 'absolute', height: '40px', left: '53px', top: '0px', border: '1px solid #DEDEE7', boxSizing: 'border-box', borderRadius: '8px' }}
                  value={this.state.image}
                  onChange={this.handleImageChange}
                />
              </div>
              <div style={{ position: 'absolute', width: '137px', height: '40px', left: '722px', top: '0px', order: 2 }}>
                <div style={{ position: 'absolute', height: '24px', left: '0px', top: '9px', fontFamily: 'Roboto', fontStyle: 'normal', fontWeight: 'normal', fontSize: '16px', lineHeight: '24px', color: '#333333' }}>
                    Port
                </div>
                <input style={{ width: '91px', fontFamily: 'Roboto', fontStyle: 'normal', fontWeight: 'normal', fontSize: '16px', lineHeight: '24px', position: 'absolute', height: '40px', left: '40px', top: '0px', border: '1px solid #DEDEE7', boxSizing: 'border-box', borderRadius: '8px' }}
                  value={this.state.port}
                  onChange={this.handlePortChange}
                />
              </div>
            </>
            : <div style={{ position: 'absolute', width: '700px', height: '40px', left: '152px', top: '0px', order: 1 }}>
              <div style={{ position: 'absolute', height: '24px', left: '0px', top: '8px', fontFamily: 'Roboto', fontStyle: 'normal', fontWeight: 'normal', fontSize: '16px', lineHeight: '24px', color: '#333333' }}>
                Image
              </div>
              <input style={{ width: '648px', fontFamily: 'Roboto', fontStyle: 'normal', fontWeight: 'normal', fontSize: '16px', lineHeight: '24px', position: 'absolute', height: '40px', left: '53px', top: '0px', border: '1px solid #DEDEE7', boxSizing: 'border-box', borderRadius: '8px' }}
                value={this.state.image}
                onChange={this.handleImageChange}
              />
            </div>}

          {/* deploy button */}
          <div className='deploy-button' style={{ order: this.props.platform === 'kubernetes' ? 3 : 2 }} onClick={this.handleSubmit}>
            <div style={{ userSelect: 'none', position: 'absolute', width: '50px', height: '24px', left: '30px', top: '9px', fontFamily: 'Roboto', fontStyle: 'normal', fontWeight: 'bold', fontSize: '16px', lineHeight: '24px', textAlign: 'center', color: '#FFFFFF' }}>
                Deploy
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DeployTemplate
