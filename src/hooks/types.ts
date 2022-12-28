import { ChapterDto } from "../pages/ArticlePage"
import { CategoryDto } from "../types"

export type ArticleDto = {
  title: string
  text: string
  chapters: ChapterDto[]
  //style: StyleDto
  tags: string[]
  categoryId: number
}

export type PartialArticleDto = {
  title: string
  text: string
  chapters: ChapterDto[]
  //style: StyleDto
  tags: string[]
  categoryId: number | null
}