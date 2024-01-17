import React from 'react'

function MsgBox (props) {   
  return (
    props.alert &&
    <div className={`alert alert-${props.alert.Msgtype}`}  role="alert">     
     {JSON.stringify(props.alert.msgText)}
    </div>
  )
}

export default MsgBox