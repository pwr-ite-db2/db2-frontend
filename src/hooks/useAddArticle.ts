import { useMutation, useQueryClient } from 'react-query'
import { BackendApi } from './BackendApi'
import { PartialArticleDto } from './types';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export const useAddArticle = () => {
  const client = useQueryClient()
  const navigate = useNavigate()
  
  const mutation = useMutation(['addArticle'], (formData: PartialArticleDto) => BackendApi.addArticle(formData), {
    onSuccess: (response) => {
      client.invalidateQueries(['getArticles'])

      toast.success('Szkic artykułu został utworzony')

      navigate(`/articles/manage?id=${response.id}`, { replace: true })
    }
  })

  return mutation
}

export default useAddArticle