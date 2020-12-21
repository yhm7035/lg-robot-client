import React from 'react'

import Table from './Table'
import Logo from './Logo'

const Main = _ => {
  return (
    <div className='main-background'>
      <div className='title'>Container-Native Clusters for Robot Intelligence</div>
      <Logo />
      <Table type='imageList' width='260' left='1120px' top='104px'/>
      <Table type='workerList' width='1040' left='60px' top='104px'/>
    </div>
  )
}

export default Main
