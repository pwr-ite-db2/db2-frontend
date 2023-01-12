import { useSearchParams } from 'react-router-dom'
import useGetArticle from '../hooks/useGetArticle'
import LoadingPage from "./LoadingPage"
import { ArticlePageView } from "./ArticlePageView"


export const ArticlePage = () => {
  const [params, _] = useSearchParams()
  const articleId = params.get('id') ? Number.parseInt(params.get('id')!) : null
  const getArticle = useGetArticle({ enabled: articleId != null, id: articleId! })


  if (getArticle.isLoading) {
    return <LoadingPage/>
  }

  return (
    <ArticlePageView article={getArticle.isFetched ? getArticle.data : undefined}/>
  )
}