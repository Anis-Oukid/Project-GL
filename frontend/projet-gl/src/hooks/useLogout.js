import { useAuthContext } from './useAuthContext'
import { redirect  } from "react-router-dom";
export const useLogout = () => {
  const { dispatch } = useAuthContext()

  const Logout = () => {
    // remove user from storage
    localStorage.removeItem('user')

    // dispatch logout action
    dispatch({ type: 'LOGOUT' })
  

  }

  return { Logout }
}