import React from 'react'

function Alert(props) {
  const {alert} = props
  return (
    <div className='position-fixed'>
      {alert&& <div className={`${alert.type==='Danger'?"alert alert-danger":"alert alert-primary"}`} role="alert" >
        <strong>{alert.type}:</strong> {alert.msg}
      </div>}
    </div>
  )
}

export default Alert
