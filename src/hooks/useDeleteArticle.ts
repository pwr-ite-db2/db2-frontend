import { useMutation, useQueryClient } from 'react-query'
import { BackendApi } from './BackendApi'
import { ArticleDto } from './types';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export const useDeleteArticle = () => {
  const client = useQueryClient()
  const navigate = useNavigate()
  
  const mutation = useMutation(['deleteArticle'], (id: number) => BackendApi.deleteArticle(id), {
    onSuccess: () => {
      client.invalidateQueries(['getArticles'])

      toast.success('Szkic artykułu został usunięty')

      navigate('/', { replace: true })
    }
  })

  return mutation
}

export default useDeleteArticle