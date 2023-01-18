import axios from 'axios'
import axiosRetry from 'axios-retry'
import { ArticleDto, PartialArticleDto, CredentialsDto, TokenDto } from './types';
import { CategoryDto } from '../types';
import { getUser } from './store';
import logoutAction from './useLogout';


const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080',
})

axiosInstance.interceptors.response.use(
  ({ data }) => data,
  (error) => {
    logoutAction('Coś poszło nie tak. Nastąpiło automatyczne wylogowanie')
    throw error
  }
)

axiosRetry(axiosInstance, { retries: 3, retryDelay: (retryCount, error) => 100 })

export namespace BackendApi {
  export function login(credentials: CredentialsDto): Promise<TokenDto> {
    return axiosInstance.post(`/auth/login`, credentials)
  } 

  export function getArticleList(): Promise<PartialArticleDto[]> {
    return axiosInstance.get('/articles', {
      headers: {
        'Authorization': `Bearer ${getUser()?.token}`
      }
    })
  }

  export function getArticle(id: number, forRedacting: boolean): Promise<PartialArticleDto & { id: number }> {
    return axiosInstance.get(`/articles/${id}${forRedacting ? '/edit' : ''}`, {
      headers: {
        'Authorization': `Bearer ${getUser()?.token}`
      }
    })
  }
  
  export function getCategories(): Promise<CategoryDto[]> {
    return axiosInstance.get('/categories', {
      headers: {
        'Authorization': `Bearer ${getUser()?.token}`
      }
    })
  }
  
  export function getTags(): Promise<{ name: string }[]> {
    return axiosInstance.get('/tags', {
      headers: {
        'Authorization': `Bearer ${getUser()?.token}`
      }
    })
  }

  export function deleteArticle(id: number): Promise<void> {
    return axiosInstance.delete(`/articles/${id}`, {
      headers: {
        'Authorization': `Bearer ${getUser()?.token}`
      }
    })
  }

  export function addArticle(formData: PartialArticleDto): Promise<{ id: number }> {
    return axiosInstance.put('/articles', formData, {
      headers: {
        'Authorization': `Bearer ${getUser()?.token}`
      }
    })
  }
  
  export function saveArticle(formData: PartialArticleDto): Promise<void> {
    return axiosInstance.put('/articles', formData, {
      headers: {
        'Authorization': `Bearer ${getUser()?.token}`
      }
    })
  }
  
  export function rollbackArticle(id: number): Promise<void> {
    return axiosInstance.get(`/articles/${id}/rollback`, {
      headers: {
        'Authorization': `Bearer ${getUser()?.token}`
      }
    })
  }

  export function saveAndForwardArticleToRedaction(formData: ArticleDto, type: 'submit' | 'publish'): Promise<void> {
    return axiosInstance.put(`/articles/${type}`, formData, {
      headers: {
        'Authorization': `Bearer ${getUser()?.token}`
      }
    })
  }
}