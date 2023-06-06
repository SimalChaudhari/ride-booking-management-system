import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { isLoggedIn } from "./../services/authService";

function Protected({ children }) {
  if (!isLoggedIn()) {
    return <Navigate to="/" replace />
  }
  return children
}
export default Protected