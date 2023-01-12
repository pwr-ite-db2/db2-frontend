import { useMutation, useQueryClient } from 'react-query'
import { BackendApi } from './BackendApi'
import { ArticleDto, PartialArticleDto } from './types';
import { useNavigate } from 'react-router-dom';

export const useSaveArticle = () => {
  const mutation = useMutation(['saveArticle'], (formData: PartialArticleDto & { id: number }) => BackendApi.saveArticle(formData))

  return mutation
}

export default useSaveArticle