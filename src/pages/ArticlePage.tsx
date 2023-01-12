import { useSearchParams } from 'react-router-dom'
import useGetArticle from '../hooks/useGetArticle'
import LoadingPage from "./LoadingPage"
import { ArticlePageView } from "./ArticlePageView"
import { Roles, getUser } from '../hooks/store'


export const ArticlePage = () => {
  const [params, _] = useSearchParams()
  const articleId = params.get('id') ? Number.parseInt(params.get('id')!) : null
  const isRedactor = getUser()?.role === Roles.REDAKTOR
  const getArticle = useGetArticle({ enabled: articleId != null, id: articleId!, forRedacting: isRedactor})

  if (getArticle.isLoading) {
    return <LoadingPage/>
  }

  return (
    <ArticlePageView
      isRedactor={isRedactor} 
      article={getArticle.isFetched ? getArticle.data : undefined}
    />
  )
}