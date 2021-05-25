import React from 'react'
import axios from 'axios'
import Question from './image/Question'
import Cell from './Cell'

class ImageTable extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      currPage: 0,
      maxPage: 0,
      maxNumList: 0,
      fullList: [],
      currList: [],
      isLeftHover: false,
      isRightHover: false
    }

    this.nextPage = this.nextPage.bind(this)
    this.previousPage = this.previousPage.bind(this)
    this.hoverOnArrow = this.hoverOnArrow.bind(this)
    this.leaveOnArrow = this.leaveOnArrow.bind(this)
  }

  componentDidMount () {
    this.getList()
  }

  hoverOnArrow (e) {
    if (e.target.alt === 'arrow-right') {
      this.setState({ isRightHover: true })
    } else if (e.target.alt === 'arrow-left') {
      this.setState({ isLeftHover: true })
    }
  }

  leaveOnArrow (e) {
    if (e.target.alt === 'arrow-right-hover') {
      this.setState({ isRightHover: false })
    } else if (e.target.alt === 'arrow-left-hover') {
      this.setState({ isLeftHover: false })
    }
  }

  previousPage () {
    const currPage = this.state.currPage

    if (currPage <= 1) {
      return
    }

    const nextPage = currPage - 1
    const nextStart = (nextPage - 1) * 10
    const nextEnd = nextPage * 10

    this.setState({
      currPage: nextPage,
      currList: this.state.fullList.slice(nextStart, nextEnd)
    })
  }

  nextPage () {
    const currPage = this.state.currPage
    const maxPage = this.state.maxPage
    const maxNumList = this.state.maxNumList

    if (currPage >= maxPage) {
      return
    }

    const nextPage = currPage + 1
    const nextStart = currPage * 10
    const nextEnd = nextPage * 10 > maxNumList ? maxNumList : nextPage * 10

    this.setState({
      currPage: nextPage,
      currList: this.state.fullList.slice(nextStart, nextEnd)
    })
  }

  getList () {
    axios.get('/registry/imageList')
      .then(res => {
        const fullList = res.data.repositories
        const numList = fullList.length

        if (numList >= 10) {
          this.setState({
            currPage: 1,
            maxPage: Math.ceil(numList / 10),
            maxNumList: numList,
            fullList,
            currList: fullList.slice(0, 10),
          })
        } else {
          this.setState({
            currPage: 0,
            maxPage: 0,
            maxNumList: numList,
            fullList,
            currList: fullList,
          })
        }
      })
  }

  render () {
    const list = this.state.currList
    const numList = list.length
    const isPage = this.state.currPage !== 0

    const { width, left, top } = this.props
    const height = `${isPage ? 761 : numList > 2 ? 65 * numList + 111 : 306}px`
    const background = '#ACACC2'
    const textColor = '#FFFFFF'

    return (
      <div className='table-background' style={{ height, width: `${width}px`, left, top, background }}>
        <div className='table-header' style={{ width: `${Number(width) - 40}px`, left: '20px', top: '22px' }}>
          <div style={{ height: '44px', width: `${Number(width) - 40}px`, top: '0px', order: 0, margin: '0px 0px 0px 11px', display: 'flex', flexDirection: 'row', alignItems: 'flex-start' }}>
            <div className='table-header-text' style={{ color: textColor }}>Container Image Hub</div>
            <Question />
          </div>
        </div>
        <div className='table-header-line' style={{ background: '#C8C7D7', width: `${Number(width) - 40}px` }}/>
        { list.map((info, index) => {
          return <Cell key={index} index={index} width={`${Number(width) - 40}px`} background={'#C8C7D7'} name={info} type='imageList'/>
        })}
        { isPage &&
          <div>
            { this.state.isLeftHover
              ? <img draggable='false' className="icon-image" src="./assets/icons/container/left-hover.png" alt="arrow-left-hover" onMouseLeave={e => this.leaveOnArrow(e)} onClick={this.previousPage} style={{ margin: `${717 + 9}px 0px 0px 40px`, cursor: 'pointer' }}/>
              : <img draggable='false' className="icon-image" src="./assets/icons/container/left.png" alt="arrow-left" onMouseEnter={e => this.hoverOnArrow(e)} style={{ margin: `${717 + 9}px 0px 0px 40px`, cursor: 'pointer' }}/>
            }
            { this.state.isRightHover
              ? <img draggable='false' className="icon-image" src="./assets/icons/container/right-hover.png" alt="arrow-right-hover" onMouseLeave={e => this.leaveOnArrow(e)} onClick={this.nextPage} style={{ margin: `${717 + 9}px 0px 0px ${Number(width) - 128}px`, cursor: 'pointer' }}/>
              : <img draggable='false' className="icon-image" src="./assets/icons/container/right.png" alt="arrow-right" onMouseEnter={e => this.hoverOnArrow(e)} style={{ margin: `${717 + 9}px 0px 0px ${Number(width) - 128}px`, cursor: 'pointer' }}/>
            }
          </div>
        }
      </div>
    )
  }
}

export default ImageTable
