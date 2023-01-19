import { useQuery } from 'react-query'
import { BackendApi } from './BackendApi'

export const useGetArticleList = (isAuthor: boolean) => {
  const query = useQuery(['getArticleList'], () => BackendApi.getArticleList(isAuthor))

  return query
}

export default useGetArticleList