import React from 'react'
import { Link } from 'react-router-dom'

class NameCell extends React.Component {
  constructor (props) {
    super(props)
    this.state = { isHover: false }

    this.hoverOnArrow = this.hoverOnArrow.bind(this)
    this.leaveOnArrow = this.leaveOnArrow.bind(this)
  }

  hoverOnArrow () {
    this.setState({ isHover: true })
  }

  leaveOnArrow () {
    this.setState({ isHover: false })
  }

  render () {
    if (this.state.isHover) {
      return (
        <div className='table-cell-text-area' style={{ width: this.props.width, order: this.props.index }}>
          <div className="table-cell-text" style={{ color: '#333333', order: 0 }}>{this.props.name}</div>
          <Link draggable='false' style={{ order: 1 }} to={`${this.props.platform === 'docker' ? '/docker' : '/kubernetes'}?address=${this.props.address}&platform=${this.props.platform}&name=${this.props.name}`}>
            <img draggable='false' className="arrow" src="./assets/icons/arrow-hover.png" alt="arrow-hover" onMouseLeave={_ => this.leaveOnArrow()} style={{ margin: '24px 0px 0px 4px', cursor: 'pointer' }}/>
          </Link>
        </div>
      )
    } else {
      return (
        <div className='table-cell-text-area' style={{ width: this.props.width, order: this.props.index }}>
          <div className="table-cell-text" style={{ color: '#333333', order: 0 }}>{this.props.name}</div>
          <Link draggable='false' style={{ order: 1 }} to={`${this.props.platform === 'docker' ? '/docker' : '/kubernetes'}?address=${this.props.address}&platform=${this.props.platform}&name=${this.props.name}`}>
            <img draggable='false' className="arrow" src="./assets/icons/arrow.png" alt="arrow" onMouseEnter={_ => this.hoverOnArrow()} style={{ margin: '24px 0px 0px 4px', cursor: 'pointer' }}/>
          </Link>
        </div>
      )
    }
  }
}

export default NameCell
