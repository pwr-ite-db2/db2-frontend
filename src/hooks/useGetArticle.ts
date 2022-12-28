import { useQuery } from 'react-query'
import { BackendApi } from './BackendApi'

type Options = { 
  enabled: boolean
  id: number
}

export const useGetArticle = (options: Options) => {
  const query = useQuery(['getArticle'], () => BackendApi.getArticle(options.id), {
    enabled: options.enabled
  })

  return query
}

export default useGetArticle