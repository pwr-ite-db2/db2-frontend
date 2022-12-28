import { useMutation, useQueryClient } from 'react-query'
import { BackendApi } from './BackendApi'
import { ArticleDto } from './types';
import { useNavigate } from 'react-router-dom';

export const useSaveAndFrowardArticleToRedaction = () => {
  const client = useQueryClient()
  const navigate = useNavigate()
  
  const mutation = useMutation(['redaction'], (formData: ArticleDto) => BackendApi.saveAndForwardArticleToRedaction(formData), {
    onSuccess: () => {
      client.invalidateQueries(['getArticles'])

      navigate('/', { replace: true })
    }
  })

  return mutation
}

export default useSaveAndFrowardArticleToRedaction