import queryString from 'query-string'

import React from 'react'
import Logo from '../../Logo'
import Table from '../../Table'
import ImageTable from '../../ImageTable'
import AddressTitle from '../AddressTitle'
import DeployTemplate from '../DeployTemplate'

class DockerMain extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      address: '',
      platform: '',
      name: '',
      image: '',
      port: '',
      height: '288px'
    }

    this.heightHandler = this.heightHandler.bind(this)
  }

  componentDidMount () {
    const { address, platform, name } = queryString.parse(this.props.location.search)

    if (!!address && !!platform && !!name) {
      this.setState({
        address,
        platform,
        name
      })
    }
  }

  heightHandler (height) {
    this.setState({
      height: height
    })
  }

  render () {
    const { address, platform, name } = this.state
    const webWidth = window.innerWidth > 1440 ? window.innerWidth : 1440
    const webHeight = window.innerHeight * 2 > 1024 ? window.innerHeight * 2 : 1024

    if (!!address && !!platform && !!name) {
      return (
        <div className='main-background' style={{ width: `${webWidth}px`, height: `${webHeight}px` }}>
          <div className='title'>Container-Native Clusters for Robot Intelligence</div>
          <Logo />
          <ImageTable width='260' left='1120px' top='104px' />
          <AddressTitle address={address} platform={platform}/>
          <DeployTemplate address={address} name={name} platform={platform} cookies={this.props.cookies} heightHandler={this.heightHandler}/>
          <Table type='containerList' address={address} name={name} platform={platform} cookies={this.props.cookies} width='1040' left='60px' top={this.state.height}/>
        </div>
      )
    } else {
      return null
    }
  }
}

export default DockerMain
