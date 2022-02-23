import React from 'react';
import err from './err.png'

export function Error404() {
  return (
    <div>
      <div>404</div>
      <div>Page not found!</div>
      <div>
        <div style={{width: '80%', margin: '0 auto'}}>
          <img src={err} alt="err" style={{borderRadius: '50%'}}/>
        </div>
      </div>
    </div>
  )
}

