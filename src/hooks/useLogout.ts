import { useNavigate } from 'react-router-dom';
import { UserData } from './useLogin';


export const useLogout = () => {
  const navigate = useNavigate()
  
  UserData.authToken = null
  UserData.email = null

  navigate('/login')
}

export default useLogout