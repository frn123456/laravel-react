import React from 'react'

const FieldError = ({errors, field}) => {
    if(!errors?.[field]) return null;
  return (
    <p className='text-red-500 text-xs mt-1'>
        {errors[field][0]}
    </p>
  )
}

export default FieldError