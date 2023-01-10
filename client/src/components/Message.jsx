import React from 'react'
import './style.css'

const Message = ({ data, user }) => {
  return (
    <div
      className={data.user.name === user ? 'messageLine Right' : 'messageLine'}
    >
      <span className="message__info">{data.user.name}:</span>
      <span className="message">{data.message}</span>
    </div>
  )
}

export default Message
