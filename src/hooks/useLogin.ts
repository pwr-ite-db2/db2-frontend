import { useMutation, useQueryClient } from 'react-query'
import { BackendApi } from './BackendApi'
import { CredentialsDto, PartialArticleDto } from './types';
import { useNavigate } from 'react-router-dom';
import jwt from 'jwt-decode'

export type User = {
  authToken?: string | null
  email?: string | null
  role?: string | null
}

export const UserData: User = {}

export const useLogin = () => {
  const navigate = useNavigate()
  
  const mutation = useMutation(['login'], (data: CredentialsDto) => BackendApi.login(data), {
    onSuccess: (response) => {
      console.log(response)
      if (response.token) {
        console.log('x')
        UserData.authToken = response.token
        const sub = (jwt(response.token) as any).sub
        UserData.email = sub
        
        navigate(`/articles/manage`, { replace: true })
      }
    }
  })

  return mutation
}

export default useLogin