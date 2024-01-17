import React from 'react'

function MsgBox ({msgText, Msgtype, Displaynone}) {   
  return (
    <div className={`alert alert-${Msgtype} ${Displaynone}`}  role="alert">     
     {JSON.stringify(msgText)}
    </div>
  )
}

export default MsgBox