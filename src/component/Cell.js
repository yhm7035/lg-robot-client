import React from 'react'

import { workerHeaders, kubernetesHeaders, dockerHeaders } from '../static/form'
import NameCell from './NameCell'
import DeleteButton from './worker/DeleteButton'

class Cell extends React.Component {
  render () {
    const cellTop = 64 + 65 * this.props.index
    const lineTop = 132 + 65 * this.props.index

    const width = this.props.width
    const background = this.props.background

    return (
      <>
        <div className="table-cell" style={{ top: `${cellTop}px`, width }}>
          { this.props.type === 'imageList' &&
            <div className='table-cell-text-area' style={{ width }}><div className="table-cell-text" style={{ width, color: '#FFFFFF' }}>{this.props.name}</div></div>}

          { this.props.type === 'workerList' &&
            workerHeaders.map((form, index) => {
              if (form.type === 'name') {
                return <NameCell key={index} width={form.width} order={index} address={this.props.address} platform={this.props.platform} name={this.props.name}/>
              } else if (form.type === 'platform') {
                return (
                  <div className='table-cell-text-area' key={index} style={{ width: form.width, order: index }}>
                    <div className="table-cell-text" style={{ color: '#333333' }}>{this.props[form.type]}</div>
                    {this.props.platform === 'docker'
                      ? <img draggable='false' className='icon-image' src='./assets/docker.png' alt='docker' style={{ margin: '24px 0px 0px 4px' }}/>
                      : <img draggable='false' className='icon-image' src='./assets/kubernetes.png' alt='kubernetes' style={{ margin: '24px 0px 0px 4px' }}/>}
                  </div>
                )
              } else {
                return <div className='table-cell-text-area' key={index} style={{ width: form.width, order: index }}><div className="table-cell-text" style={{ width: form.width, color: '#333333' }}>{this.props[form.type]}</div></div>
              }
            })}

          { (this.props.type === 'containerList' && this.props.platform === 'kubernetes') &&
            kubernetesHeaders.map((form, index) => {
              if (form.type === 'delete') {
                return (
                  <div className='table-cell-text-area' key={index} style={{ width: form.width, order: index }}>
                    <DeleteButton address={this.props.address} platform={this.props.platform} name={this.props.name} containerId={this.props.containerId} />
                  </div>
                )
              } else if (form.type === 'status') {
                return (
                  <div className='table-cell-text-area' key={index} style={{ width: form.width, order: index }}>
                    {/* status icons */}
                    { this.props.status === 'success' &&
                      <img draggable='false' className='icon-image' src='./assets/icons/kubernetes/success.png' alt='success' style={{ margin: '24px 0px 0px 4px' }}/>}
                    { this.props.status === 'failed' &&
                      <img draggable='false' className='icon-image' src='./assets/icons/kubernetes/failed.png' alt='failed' style={{ margin: '24px 0px 0px 4px' }}/>}
                    { this.props.status === 'pending' &&
                      <img draggable='false' className='icon-image' src='./assets/icons/kubernetes/pending.png' alt='pending' style={{ margin: '24px 0px 0px 4px' }}/>}
                    { this.props.status === 'createContainer' &&
                      <img draggable='false' className='icon-image-rotate' src='./assets/icons/kubernetes/creating.png' alt='creating' style={{ margin: '24px 0px 0px 4px' }}/>}
                    <div className="table-cell-text" style={{ width: form.width, color: '#333333' }}>{this.props.status}</div>
                  </div>
                )
              } else if (form.type === 'endpoint') {
                return (
                  <div className='table-cell-text-area' key={index} style={{ width: form.width, order: index }}>
                    <div className="table-cell-text" style={{ width: form.width, color: '#333333' }}>
                      <a href={`http://${this.props[form.type]}`} target='_blank'>
                        {this.props[form.type]}
                      </a>
                    </div>
                  </div>
                )
              } else {
                return <div className='table-cell-text-area' key={index} style={{ width: form.width, order: index }}>
                  <div className="table-cell-text" style={{ width: form.width, color: '#333333' }}>
                    {this.props[form.type]}
                  </div>
                </div>
              }
            })}

          { (this.props.type === 'containerList' && this.props.platform === 'docker') &&
            dockerHeaders.map((form, index) => {
              if (form.type === 'delete') {
                return (
                  <div className='table-cell-text-area' key={index} style={{ width: form.width, order: index }}>
                    <DeleteButton address={this.props.address} platform={this.props.platform} name={this.props.name} containerId={this.props.containerId} />
                  </div>
                )
              } else if (form.type === 'status') {
                return (
                  <div className='table-cell-text-area' key={index} style={{ width: form.width, order: index }}>
                    {/* status icons */}
                    { (this.props.status === 'running' || this.props.status === 'created') &&
                      <img draggable='false' className='icon-image' src='./assets/icons/docker/working.png' alt='working' style={{ margin: '24px 0px 0px 4px' }}/>}
                    { this.props.status === 'paused' &&
                      <img draggable='false' className='icon-image' src='./assets/icons/docker/paused.png' alt='paused' style={{ margin: '24px 0px 0px 4px' }}/>}
                    { (this.props.status === 'restarting' || this.props.status === 'removing') &&
                      <img draggable='false' className='icon-image-rotate' src='./assets/icons/docker/waiting.png' alt='waiting' style={{ margin: '24px 0px 0px 4px' }}/>}
                    { this.props.status === 'dead' &&
                      <img draggable='false' className='icon-image' src='./assets/icons/docker/dead.png' alt='dead' style={{ margin: '24px 0px 0px 4px' }}/>}
                    { this.props.status === 'exited' &&
                      <img draggable='false' className='icon-image' src='./assets/icons/docker/exited.png' alt='exited' style={{ margin: '24px 0px 0px 4px' }}/>}
                    <div className="table-cell-text" style={{ width: form.width, color: '#333333' }}>{this.props.status}</div>
                  </div>
                )
              } else {
                return <div className='table-cell-text-area' key={index} style={{ width: form.width, order: index }}><div className="table-cell-text" style={{ width: form.width, color: '#333333' }}>{this.props[form.type]}</div></div>
              }
            })}
        </div>
        <div className="table-line" style={{ top: `${lineTop}px`, background, width }}/>
      </>
    )
  }
}

export default Cell
