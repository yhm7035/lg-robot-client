import React from 'react'

class AddressTitle extends React.Component {
  render () {
    return (
      <div className='address-title'>
        {/* Address field */}
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', position: 'absolute', width: '600px', height: '24px', left: '32px', top: '20px' }}>
          <div style={{ fontFamily: 'Roboto', fontStyle: 'normal', fontWeight: 'bold', fontSize: '16px', lineHeight: '24px', color: '#333333' }}>Address</div>
          <div style={{ fontFamily: 'Roboto', fontStyle: 'normal', fontWeight: 'normal', fontSize: '16px', lineHeight: '24px', color: '#333333', margin: '0px 8px' }}>{this.props.address}</div>
        </div>

        {/* Platform field */}
        <div style={{ display: 'flex', flexDrection: 'row', alignItems: 'flex-start', position: 'absolute', width: '120px', height: '24px', left: '900px', top: '20px' }}>
          { this.props.platform === 'docker'
            ? <>
              <img draggable='false' className='icon-image' src="./assets/docker.png" alt="docker" style={{ order: 0, margin: '0px 0px 0px 29px' }}/>
              <div style={{ fontFamily: 'Roboto', fontStyle: 'normal', fontWeight: 'normal', fontSize: '16px', lineHeight: '24px', color: '#333333', order: 1, margin: '0px 0px 0px 4px' }}>Docker</div>
            </>
            : <>
              <img draggable='false' className='icon-image' src="./assets/kubernetes.png" alt="kubernetes" style={{ order: 0, margin: '0px 0px 0px 0px' }}/>
              <div style={{ fontFamily: 'Roboto', fontStyle: 'normal', fontWeight: 'normal', fontSize: '16px', lineHeight: '24px', color: '#333333', order: 1, margin: '0px 0px 0px 4px' }}>kubernetes</div>
            </>}
        </div>
      </div>
    )
  }
}

export default AddressTitle
