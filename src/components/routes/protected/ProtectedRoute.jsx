import React, { useContext } from 'react'
import { AuthContext } from '../../../auth/Auth.Context'
import { Navigate } from 'react-router'

const ProtectedRoute = ({children, requiredRole}) => {
  
  const {token, userRole} = useContext(AuthContext)
  
  if(!token){
    return <Navigate to="/login" replace/>
  }

  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/unauthorized" replace/>
  }
  
  return children
}

export default ProtectedRoute