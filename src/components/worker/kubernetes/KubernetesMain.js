import queryString from 'query-string'

import React from 'react'
import Logo from '../../Logo'
import Table from '../../Table'
import ImageTable from '../../ImageTable'
import AddressTitle from '../AddressTitle'
import DeployTemplate from '../DeployTemplate'

class KubernetesMain extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      address: '',
      platform: '',
      name: '',
      image: '',
      port: ''
    }
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

  render () {
    const { address, platform, name } = this.state

    if (!!address && !!platform && !!name) {
      return (
        <div className='main-background'>
          <div className='title'>Container-Native Clusters for Robot Intelligence</div>
          <Logo />
          <ImageTable width='260' left='1120px' top='104px' />
          <AddressTitle address={address} platform={platform}/>
          <DeployTemplate address={address} name={name} platform={platform} cookies={this.props.cookies}/>
          <Table type='containerList' address={address} name={name} platform={platform} cookies={this.props.cookies} width='1040' left='60px' top='288px'/>
        </div>
      )
    } else {
      return null
    }
  }
}

export default KubernetesMain
