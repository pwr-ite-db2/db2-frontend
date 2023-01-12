import axios from 'axios'
import axiosRetry from 'axios-retry'
import { ArticleDto, PartialArticleDto, CredentialsDto, TokenDto } from './types';
import { CategoryDto } from '../types';
import { UserData, User } from './useLogin';


const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080',
})

axiosInstance.interceptors.response.use(({ data }) => data)

axiosRetry(axiosInstance, { retries: 3, retryDelay: (retryCount, error) => 100 })

export namespace BackendApi {
  export function login(credentials: CredentialsDto): Promise<TokenDto> {
    return axiosInstance.post(`/auth/login`, credentials, {
      headers: {
        'Authorization': UserData.authToken
      }
    })
  } 

  export function getArticle(id: number): Promise<PartialArticleDto> {
    return axiosInstance.get(`/articles/${id}`, {
      headers: {
        'Authorization': UserData.authToken
      }
    })
  }
  
  export function getCategories(): Promise<CategoryDto[]> {
    return axiosInstance.get('/categories', {
      headers: {
        'Authorization': UserData.authToken
      }
    })
  }
  
  export function getTags(): Promise<{ name: string }[]> {
    return axiosInstance.get('/tags', {
      headers: {
        'Authorization': UserData.authToken
      }
    })
  }

  export function deleteArticle(id: number): Promise<void> {
    return axiosInstance.delete(`/articles/${id}`, {
      headers: {
        'Authorization': UserData.authToken
      }
    })
  }

  export function addArticle(formData: PartialArticleDto): Promise<{ id: number }> {
    // return axiosInstance.post('/articles', formData)
    return axiosInstance.put('/articles', formData, {
      headers: {
        'Authorization': UserData.authToken
      }
    })
  }
  
  export function saveArticle(formData: PartialArticleDto): Promise<void> {
    return axiosInstance.put('/articles', formData, {
      headers: {
        'Authorization': UserData.authToken
      }
    })
  }

  export function saveAndForwardArticleToRedaction(formData: ArticleDto, type: 'submit' | 'publish'): Promise<void> {
    return axiosInstance.put(`/articles/${type}`, formData, {
      headers: {
        'Authorization': UserData.authToken
      }
    })
  }
}