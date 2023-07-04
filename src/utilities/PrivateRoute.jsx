import React from 'react'
import {Link} from 'react-router-dom'

const PrivateRoute = (children) => {
  const authenticated = false

  return !authenticated ? <Link to="/login "/> : children
}

export default PrivateRoute