import { useNavigate } from 'react-router-dom';
import { removeUser } from './store';

export const logoutAction = () => {
  removeUser()
  window.location.reload()
}

export default logoutAction