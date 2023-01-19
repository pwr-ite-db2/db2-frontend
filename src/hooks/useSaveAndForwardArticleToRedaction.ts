import { useMutation, useQueryClient } from 'react-query'
import { BackendApi } from './BackendApi'
import { ArticleDto } from './types';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export const useSaveAndFrowardArticleToRedaction = (type: 'submit' | 'publish') => {
  const client = useQueryClient()
  const navigate = useNavigate()
  
  const mutation = useMutation(['redaction'], (data: { formData: ArticleDto & { id: number } }) => BackendApi.saveAndForwardArticleToRedaction(data.formData, type), {
    onSuccess: () => {
      client.invalidateQueries(['getArticles'])

      toast.success(`Szkic artykułu został ${type === 'submit' ? 'przekazany do redaktora' : 'opublikoway'}`)

      navigate('/', { replace: true })
    }
  })

  return mutation
}

export default useSaveAndFrowardArticleToRedaction