import React from 'react'
import axios from 'axios'

import { workerHeaders, kubernetesHeaders, dockerHeaders } from '../static/form'
import Question from './image/Question'
import Cell from './Cell'

class Table extends React.Component {
  constructor (props) {
    super(props)

    this.state = { list: [] }
  }

  componentDidMount () {
    this.getList()
  }

  getList () {
    if (this.props.type === 'imageList') {
      axios.get('/registry/imageList')
        .then(res => {
          this.setState({ list: res.data.repositories })
        })
    } else if (this.props.type === 'workerList') {
      axios.get('/workers/list')
        .then(res => {
          this.setState({ list: res.data.list })
        })
    } else if (this.props.type === 'containerList' && this.props.platform === 'kubernetes') {
      axios.get(`/container/cluster/list?address=${this.props.address}&name=${this.props.name}`)
        .then(res => {
          this.setState({ list: res.data.list })
        })
    } else if (this.props.type === 'containerList' && this.props.platform === 'docker') {
      axios.get(`/container/machine/list?address=${this.props.address}&name=${this.props.name}`)
        .then(res => {
          this.setState({ list: res.data.list })
        })
    }
  }

  render () {
    const list = this.state.list
    const numList = list.length

    const { width, left, top } = this.props
    const height = `${numList > 2 ? 65 * numList + 111 : 306}px`
    const background = this.props.type === 'imageList' ? '#ACACC2' : '#FFFFFF'
    const textColor = this.props.type === 'imageList' ? '#FFFFFF' : '#333333'

    return (
      <div className='table-background' style={{ height, width: `${width}px`, left, top, background }}>
        <div className='table-header' style={{ width: `${Number(width) - 40}px`, left: '20px', top: '22px' }}>
          { this.props.type === 'imageList' &&
            <div style={{ height: '44px', width: `${Number(width) - 40}px`, top: '0px', order: 0, margin: '0px 0px 0px 11px', display: 'flex', flexDirection: 'row', alignItems: 'flex-start' }}>
              <div className='table-header-text' style={{ color: textColor }}>Container Image Hub</div>
              <Question />
            </div> }
          { this.props.type === 'workerList' &&
          workerHeaders.map((info, index) => {
            return <div key={index} style={{ height: '44px', width: info.width, top: '0px', order: index }}><div className='table-header-text' style={{ color: textColor }}>{info.title}</div></div>
          })}
          { (this.props.type === 'containerList' && this.props.platform) === 'kubernetes' &&
          kubernetesHeaders.map((info, index) => {
            return <div key={index} style={{ height: '44px', width: info.width, top: '0px', order: index }}><div className='table-header-text' style={{ color: textColor }}>{info.title}</div></div>
          })}
          { (this.props.type === 'containerList' && this.props.platform) === 'docker' &&
          dockerHeaders.map((info, index) => {
            return <div key={index} style={{ height: '44px', width: info.width, top: '0px', order: index }}><div className='table-header-text' style={{ color: textColor }}>{info.title}</div></div>
          })}
        </div>
        { this.props.type === 'imageList'
          ? <div className='table-header-line' style={{ background: '#C8C7D7', width: `${Number(width) - 40}px` }}/>
          : <div className='table-header-line' style={{ background: '#ECECEC', width: `${Number(width) - 40}px` }}/>}
        { (numList > 0 && this.props.type === 'imageList') &&
          list.map((info, index) => {
            return <Cell key={index} index={index} width={`${Number(width) - 40}px`} background={'#C8C7D7'} name={info} type='imageList'/>
          })}
        { (numList > 0 && this.props.type === 'workerList') &&
          list.map((info, index) => {
            return <Cell key={index} index={index} width={`${Number(width) - 40}px`} background={'#ECECEC'} address={info.address} name={info.name} platform={info.platform} type='workerList'/>
          })}
        { (numList > 0 && this.props.type === 'containerList' && this.props.platform === 'kubernetes') &&
          list.map((info, index) => {
            return <Cell key={index} index={index} width={`${Number(width) - 40}px`} background={'#ECECEC'} address={this.props.address} name={this.props.name} platform='kubernetes' containerId={info.containerId} imageName={info.imageName} status={info.status} endpoint={info.endpoint} type='containerList'/>
          })}
        { (numList > 0 && this.props.type === 'containerList' && this.props.platform === 'docker') &&
          list.map((info, index) => {
            return <Cell key={index} index={index} width={`${Number(width) - 40}px`} background={'#ECECEC'} address={this.props.address} name={this.props.name} platform='docker' containerId={info.containerId} imageName={info.imageName} status={info.status} type='containerList'/>
          })}
      </div>
    )
  }
}

export default Table
