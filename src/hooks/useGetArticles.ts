import { useQuery } from 'react-query'
import { BackendApi } from './BackendApi'

export const useGetArticleList = () => {
  const query = useQuery(['getArticleList'], () => BackendApi.getArticleList())

  return query
}

export default useGetArticleList