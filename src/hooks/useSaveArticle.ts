import { useMutation, useQueryClient } from 'react-query'
import { BackendApi } from './BackendApi'
import { PartialArticleDto } from './types';
import { toast } from 'react-hot-toast';

export const useSaveArticle = () => {
  const client = useQueryClient()

  const mutation = useMutation(['saveArticle'], (formData: PartialArticleDto & { id: number }) => BackendApi.saveArticle(formData), {
    onSuccess: () => {
      client.invalidateQueries(['getArticles'])

      toast.success('Szkic artykułu został zapisany')
    }
  })


  return mutation
}

export default useSaveArticle