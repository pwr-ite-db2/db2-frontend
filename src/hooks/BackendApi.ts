import axios from 'axios'
import axiosRetry from 'axios-retry'
import { ArticleDto, PartialArticleDto } from './types'
import { CategoryDto } from '../types';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000',
})

axiosRetry(axiosInstance, { retries: 3, retryDelay: (retryCount, error) => 100 })

export namespace BackendApi {
  export function getArticle(id: number): Promise<PartialArticleDto> {
    return axiosInstance.get('/articles', { params: { id: id } })
  }
  
  export function getCategories(): Promise<CategoryDto[]> {
    return axiosInstance.get('/categories')
  }
  
  export function getTags(): Promise<string[]> {
    return axiosInstance.get('/tags')
  }

  export function deleteArticle(id: number): Promise<void> {
    return axiosInstance.delete('/articles', { params: { id: id } })
  }

  export function addArticle(formData: PartialArticleDto): Promise<{ id: number }> {
    return axiosInstance.post('/articles', formData)
  }
  
  export function saveArticle(formData: PartialArticleDto): Promise<void> {
    return axiosInstance.patch('/articles', formData)
  }

  export function saveAndForwardArticleToRedaction(formData: ArticleDto): Promise<void> {
    return axiosInstance.patch('/articles', formData)
  }
}