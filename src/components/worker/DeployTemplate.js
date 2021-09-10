import React from 'react'
import axios from 'axios'

class DeployTemplate extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      image: '',
      port: '',
      command: '',
      fileName: '',
      envs: {},
      fold: true
    }

    this.handleImageChange = this.handleImageChange.bind(this)
    this.handlePortChange = this.handlePortChange.bind(this)
    this.handleCommandChange = this.handleCommandChange.bind(this)
    this.sendDeployRequest = this.sendDeployRequest.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleFold = this.handleFold.bind(this)
    this.loadJsonFile = this.loadJsonFile.bind(this)
  }

  handleImageChange = (event) => {
    this.setState({
      image: event.target.value
    })
  }

  handlePortChange = (event) => {
    this.setState({
      port: event.target.value
    })
  }

  handleCommandChange = (event) => {
    this.setState({
      command: event.target.value
    })
  }

  sendDeployRequest = (image, port, command, envs) => {
    const cookies = this.props.cookies
    const email = cookies.get('email')
    const ports = port.split(',')

    const intPorts = []
    let isHost = false

    if (this.props.platform === 'kubernetes') {
      for (let i = 0; i < ports.length; i++) {
        const num = parseInt(ports[i])

        if (isNaN(num)) {
          alert('Error: Port has to be number(s).')
          return
        }

        intPorts.push(num)
      }

      axios.post('/run/cluster/deploy', {
        address: this.props.address,
        email,
        imageName: image,
        command,
        envs,
        ports: intPorts,
        clusterName: this.props.name
      }).then(res => {
        alert(res.data.message)
        window.location.reload()
      })
    } else if (this.props.platform === 'docker') {
      if (port === 'host') {
        isHost = true
      } else {
        for (let i = 0; i < ports.length; i++) {
          const num = parseInt(ports[i])

          if (isNaN(num)) {
            alert("Error: Port has to be number(s) or 'host'.")
            return
          }

          intPorts.push(num)
        }
      }

      axios.post('/run/machine/deploy', {
        address: this.props.address,
        email,
        imageName: image,
        command,
        envs,
        isHost,
        ports: intPorts,
        clusterName: this.props.name
      }).then(res => {
        alert(res.data.message)
        window.location.reload()
      })
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()

    const image = this.state.image
    const port = this.state.port
    const command = this.state.command
    const envs = this.state.envs

    if (!image) {
      alert('Error: Image is required parameter.')
      return
    }

    this.sendDeployRequest(image, port, command, envs)

    this.setState({
      image: '',
      port: '',
      command: '',
      fileName: '',
      envs: {}
    })
  }

  handleFold = () => {
    const foldStatus = !this.state.fold

    if (foldStatus) {
      this.props.heightHandler('288px')
    } else {
      this.props.heightHandler('388px')
    }

    this.setState({
      fold: foldStatus
    })
  }

  loadJsonFile = (event) => {
    event.preventDefault()

    const file = event.target.files[0]

    if (file.type !== 'application/json') {
      alert('Error: Only json file can be uploaded.')
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      try {
        const envs = JSON.parse(reader.result)

        event.target.value = null

        this.setState({
          fileName: file.name,
          envs: envs
        })
      } catch (_) {
        alert('Error: Invalid json format.')
      }
    }
    reader.readAsText(file)
  }

  render () {
    return (
      <div className={this.state.fold ? 'deploy-template' : 'deploy-template-unfold'}>
        <div style={{ display: 'flex', flexDirection: 'row', position: 'absolute', width: '976px', height: '40px', left: '27px', top: '20px' }}>
          <div style={{ position: 'absolute', width: '134px', height: '24px', top: '8px', left: '0px', order: 0 }}>
            {/* add icon */}
            <img draggable='false' className='icon-image' style={{ position: 'absolute', left: '0px', top: '0px' }} src="./assets/icons/add.png" alt="add_icon"/>
            <div style={{ position: 'absolute', left: '28px', top: '1px', fontFamily: 'Roboto', fontStyle: 'normal', fontWeight: 'bold', fontSize: '16px', lineHeight: '24px', color: '#333333' }}>
              Add container:
            </div>
          </div>

          {/* deploy template */}
          <div style={{ position: 'absolute', width: '563px', height: '40px', left: '147px', top: '0px', order: 1 }}>
            <div style={{ position: 'absolute', height: '24px', left: '0px', top: '9px', fontFamily: 'Roboto', fontStyle: 'normal', fontWeight: 'normal', fontSize: '16px', lineHeight: '24px', color: '#333333' }}>
                Image
            </div>
            <input style={{ width: '462px', fontFamily: 'Roboto', fontStyle: 'normal', fontWeight: 'normal', fontSize: '16px', lineHeight: '24px', position: 'absolute', height: '40px', left: '53px', top: '0px', border: '1px solid #DEDEE7', boxSizing: 'border-box', borderRadius: '8px' }}
              value={this.state.image}
              onChange={this.handleImageChange}
            />
          </div>
          <div style={{ position: 'absolute', width: '137px', height: '40px', left: '690px', top: '0px', order: 2 }}>
            <div style={{ position: 'absolute', height: '24px', left: '0px', top: '9px', fontFamily: 'Roboto', fontStyle: 'normal', fontWeight: 'normal', fontSize: '16px', lineHeight: '24px', color: '#333333' }}>
                Port
            </div>
            <input style={{ width: '78px', fontFamily: 'Roboto', fontStyle: 'normal', fontWeight: 'normal', fontSize: '16px', lineHeight: '24px', position: 'absolute', height: '40px', left: '40px', top: '0px', border: '1px solid #DEDEE7', boxSizing: 'border-box', borderRadius: '8px' }}
              value={this.state.port}
              onChange={this.handlePortChange}
            />
          </div>

          {/* more button */}
          <img draggable='false' className='more-button' style={{ position: 'absolute', left: '827px', top: '0px', order: 3 }} onClick={this.handleFold} src="./assets/icons/sliders.png" alt="more_button"/>

          {/* deploy button */}
          <div className='deploy-button' style={{ order: 4 }} onClick={this.handleSubmit}>
            <div style={{ userSelect: 'none', position: 'absolute', width: '50px', height: '24px', left: '30px', top: '9px', fontFamily: 'Roboto', fontStyle: 'normal', fontWeight: 'bold', fontSize: '16px', lineHeight: '24px', textAlign: 'center', color: '#FFFFFF' }}>
                Deploy
            </div>
          </div>
        </div>
        {
          !this.state.fold &&
          <>
            <div style={{ display: 'flex', flexDirection: 'row', position: 'absolute', width: '976px', height: '40px', left: '27px', top: '70px' }}>
              <div style={{ position: 'absolute', height: '24px', left: '147px', top: '9px', fontFamily: 'Roboto', fontStyle: 'normal', fontWeight: 'normal', fontSize: '16px', lineHeight: '24px', color: '#333333' }}>
                Environment
              </div>
              <label htmlFor='json-input' className='json-file-button'>
                <div style={{ userSelect: 'none', fontFamily: 'Roboto', fontStyle: 'normal', fontWeight: '700', fontSize: '16px', color: '#9190AE', lineHeight: '24px', position: 'absolute', left: '15px', top: '9px' }}>
                  Upload json file
                </div>
              </label>
              <div style={{ userSelect: 'none', fontFamily: 'Roboto', fontStyle: 'normal', fontWeight: 'normal', fontSize: '16px', lineHeight: '24px', position: 'absolute', left: '397px', top: '9px' }}>
                {this.state.fileName && `${this.state.fileName} is uploaded`}
              </div>

              <input type='file' id='json-input' style={{ display: 'none' }}
                onChange={this.loadJsonFile}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', position: 'absolute', width: '976px', height: '40px', left: '27px', top: '120px' }}>
              <div style={{ position: 'absolute', height: '24px', left: '147px', top: '9px', fontFamily: 'Roboto', fontStyle: 'normal', fontWeight: 'normal', fontSize: '16px', lineHeight: '24px', color: '#333333' }}>
                  Command
              </div>
              <input style={{ width: '637px', fontFamily: 'Roboto', fontStyle: 'normal', fontWeight: 'normal', fontSize: '16px', lineHeight: '24px', position: 'absolute', height: '40px', left: '230px', top: '0px', border: '1px solid #DEDEE7', boxSizing: 'border-box', borderRadius: '8px' }}
                value={this.state.command}
                onChange={this.handleCommandChange}
              />
            </div>
          </>
        }
      </div>
    )
  }
}

export default DeployTemplate
