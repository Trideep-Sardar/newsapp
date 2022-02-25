import React from 'react'
import loading from './loading.gif';

const Spinner=()=>{  
    return (
      <div className='text-center'>
        <img src={loading} alt='image_loading'/>
      </div>
    )
  }

export default Spinner;