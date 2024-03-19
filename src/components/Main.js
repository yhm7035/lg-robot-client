import React from 'react'

import Table from './Table'
import ImageTable from './ImageTable'
import Logo from './Logo'

class Main extends React.Component {
  render () {
    const webWidth = window.innerWidth > 1440 ? window.innerWidth : 1440
    const webHeight = window.innerHeight * 2 > 1024 ? window.innerHeight * 2 : 1024

    return (
      <div className='main-background' style={{ width: `${webWidth}px`, height: `${webHeight}px` }}>
        <div className='title'>Container-Native Clusters for Robot Intelligence</div>
        <Logo />
        <ImageTable width='260' left='1120px' top='104px'/>
        <Table type='workerList' width='1040' left='60px' top='104px'/>
      </div>
    )
  }
}

export default Main
