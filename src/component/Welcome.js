import React from 'react'

function Welcome() {
  return (
    <div>
        <div className="alert alert-primary alert-dismissible fade show" role="alert">
        <strong>Welcome!</strong>  know your city's weather.
        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    </div>
  )
}

export default Welcome