import React from 'react'

class Question extends React.Component {
  constructor (props) {
    super(props)
    this.state = { isHover: false }

    this.hoverOnQuestion = this.hoverOnQuestion.bind(this)
    this.leaveOnQuestion = this.leaveOnQuestion.bind(this)
  }

  hoverOnQuestion () {
    this.setState({ isHover: true })
  }

  leaveOnQuestion () {
    this.setState({ isHover: false })
  }

  render () {
    if (this.state.isHover) {
      return (
        <a draggable='false' href='https://github.com/lge-cloud-ai-robot/paas-tutorial/tree/master/registry'>
          <img draggable='false' className='icon-image' onMouseLeave={_ => this.leaveOnQuestion()} style={{ margin: '0px 0px 0px 4px' }} src="./assets/icons/question_hover.png" alt="question_icon_hover"/>
        </a>
      )
    } else {
      return (
        <img draggable='false' className='icon-image' onMouseEnter={_ => this.hoverOnQuestion()} style={{ margin: '0px 0px 0px 4px' }} src="./assets/icons/question.png" alt="question_icon"/>
      )
    }
  }
}

export default Question
