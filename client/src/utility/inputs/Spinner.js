import React from 'react'

function Spinner() {
    
  return (
        <div class="d-flex justify-content-center">
        <div class="spinner-border m-5 text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
        </div>
    </div>
  )
}

export default Spinner