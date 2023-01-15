import { useSearchParams } from 'react-router-dom'
import useGetArticle from '../hooks/useGetArticle'
import LoadingPage from "./LoadingPage"
import { ArticlePageView } from "./ArticlePageView"
import { Roles, getUser } from '../hooks/store'
import useGetTags from '../hooks/useGetTags'
import useGetCategories from '../hooks/useGetCategories'


export const ArticlePage = () => {
  const [params, _] = useSearchParams()
  const articleId = params.get('id') ? Number.parseInt(params.get('id')!) : null
  const isRedactor = getUser()?.role === Roles.REDAKTOR
  const getArticle = useGetArticle({ enabled: articleId != null, id: articleId!, forRedacting: isRedactor})
  const tags = useGetTags()
  const categories = useGetCategories()
  
  if (getArticle.isLoading || tags.isLoading || categories.isLoading) {
    return <LoadingPage/>
  }

  return (
    <ArticlePageView
      tags={tags.data!.map(t => t.name)}
      categories={categories.data!}
      isRedactor={isRedactor} 
      article={articleId != null && getArticle.isFetched ? getArticle.data : undefined}
    />
  )
}