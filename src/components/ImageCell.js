import React from 'react'
import axios from 'axios'
import ReactTooltip from 'react-tooltip'

class ImageCell extends React.Component {
  constructor (props) {
    super(props)
    this.state = { }

    this.getImageTags = this.getImageTags.bind(this)
  }

  getImageTags (imageName) {
    if (this.state[imageName]) return

    axios.get(`/registry/imageTags?imageName=${imageName}`)
      .then(res => {
        this.setState({ [imageName]: res.data.tags })
      }).catch(_ => {
        alert('Error: Fail to get tags of image.')
      })
  }

  render () {
    const width = this.props.width
    const imageName = this.props.name
    const tags = this.state[imageName]

    return (
      <>
        <div className='table-cell-text-area' style={{ width }}><div className='table-cell-text' data-tip data-for={imageName} onMouseEnter={_ => this.getImageTags(this.props.name)} style={{ width, color: '#FFFFFF', cursor: 'pointer' }}>{this.props.name}</div></div>
        <ReactTooltip id={imageName} place='left' type='dark' effect='solid' event='click' globalEventOff='click' html={true} multiline={true} clickable={true}>
          {tags}
        </ReactTooltip>
      </>
    )
  }
}

export default ImageCell
