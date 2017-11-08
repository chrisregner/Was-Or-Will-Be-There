import React from 'react'

export default () => (
  <div
    style={{
      top: 48,
      backgroundColor: 'rgba(255, 255, 255, 0.54)',
    }}
    className='fixed right-0 left-0 bottom-0 z-1 pt5 pb2 ph2 bg-white tc'
  >
    <h1
      style={{
        fontFamily: 'Arial Black,Arial Bold,Gadget,sans-serif',
        fontSize: '6rem',
      }}
      className='ma0 normal'
    >
      404
    </h1>
    <p className='ma0 lh-copy f5'>That page doesn’t even exist!</p>
    <p className='ma0 lh-copy f6 gray'>Maybe there was some mistake in the URL?</p>
  </div>
)
