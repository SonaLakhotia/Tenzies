import React from 'react'

function Ball(props) {
  return (
    <div>
      <button
        onClick={() => props.handleClick(props.id)}
        className={`w-12 h-12
        rounded-lg
        shadow-md
        flex items-center justify-center
        border-2
        ${props.isHeld ? 'bg-green-500 text-white' : 'bg-white text-gray-800'}
      `}
    >
      {props.value}
    </button>
    </div>
  )
}

export default Ball