import { debounce } from "@mui/material"
import { Box, Grid } from "@mui/material"
import Button from "@mui/material/Button"
import { useState } from "react"
import { MainLayout } from "../components/common/MainLayout"
import { Form, Formik } from 'formik'
import { Inputs } from "../components/ArticlePage/Inputs"
import { Preview } from "../components/ArticlePage/Preview"
import { Headlines } from "../components/ArticlePage/Headlines"
import { CategoryDto } from "../types"
import { useSearchParams } from 'react-router-dom'
import useGetArticle from '../hooks/useGetArticle'
import LoadingPage from "./LoadingPage"
import useAddArticle from '../hooks/useAddArticle'
import useDeleteArticle from "../hooks/useDeleteArticle"
import useSaveArticle from '../hooks/useSaveArticle'
import useSaveAndFrowardArticleToRedaction from '../hooks/useSaveAndForwardArticleToRedaction'
import { ArticleDto, PartialArticleDto } from "../hooks/types"
import useGetTags from '../hooks/useGetTags'
import useGetCategories from "../hooks/useGetCategories"

export type ChapterDto = {
  title: string
  text: string
}

type FormData = {
  categoryId: number | null
  title: string
  text: string
  tags: string[]
  chapters: ChapterDto[]
}

export const ArticlePage = (props: { articleId?: number }) => {
  const [params, _] = useSearchParams()

  const articleId = params.get('id') ? Number.parseInt(params.get('id')!) : null
  
  const tags = useGetTags()
  const categories = useGetCategories()
  const getArticle = useGetArticle({ enabled: articleId != null, id: articleId! })
  const addArticle = useAddArticle()
  const deleteArticle = useDeleteArticle()
  const saveArticle = useSaveArticle()
  const saveAndForwardArticleToRedaction = useSaveAndFrowardArticleToRedaction()

  const [previewTitle, setPreviewTitle] = useState('')
  const [previewText, setPreviewText] = useState('')
  const [previewCategory, setPreviewCategory] = useState<CategoryDto | null>(null)
  const [previewTags, setPreviewTags] = useState<string[]>([])
  const [previewChapters, setPreviewChapters] = useState<ChapterDto[]>([])

  const handleTextChange = debounce((text: string) => setPreviewText(text), 100)
  const handleTitleChange = debounce((title: string) => setPreviewTitle(title), 100)
  const handleChaptersChange = debounce((chapters: ChapterDto[]) => setPreviewChapters(chapters), 100)
  const handleTagsChange = debounce((tags: string[]) => setPreviewTags(tags), 100)
  const handleCategoryChange = debounce((category: CategoryDto | null) => setPreviewCategory(category), 100)

  if (getArticle.isLoading || categories.isLoading) {
    return <LoadingPage/>
  } else if (getArticle.isFetched) {
    setPreviewTitle(getArticle.data?.title ?? '')
    setPreviewText(getArticle.data?.text ?? '')
    setPreviewTags(getArticle.data?.tags ?? [])
    setPreviewChapters(getArticle.data?.chapters ?? [])
    setPreviewCategory(
      getArticle.data?.categoryId 
        ? categories.data?.find(c => c.id === getArticle.data.categoryId)!
        : null
      )
  }

  return (
    <MainLayout>
      <Box
        display={'flex'}
        flexDirection={'column'}
        gap={'16px'}
      >

        <Formik<FormData>
          initialValues={{
            title: '',
            text: '',
            tags: [],
            chapters: [],
            categoryId: null
          }}
          // validate={}
          onSubmit={(data) => saveAndForwardArticleToRedaction.mutate(data as ArticleDto)}
        >
          {(formikProps) => (
            <Form style={{ width: '100%' }}>
              <Grid
                container
                direction={'row'}
                width={'100%'}
                height={'100%'}
                justifyContent={'space-between'}
                paddingRight={'14px'}
              >
                <Headlines edit={props.articleId != null} />
        
                <Inputs
                  onTextChange={() => handleTextChange(formikProps.values.text)}
                  onTitleChange={() => handleTitleChange(formikProps.values.title)}
                  onCategoryChange={(category) => { formikProps.values.categoryId = category?.id ?? null; handleCategoryChange(category)}}
                  onTagsChange={(tags) => { formikProps.values.tags = tags; handleTagsChange(tags)}}
                  onChaptersChange={() => handleChaptersChange(formikProps.values.chapters)}
                  onChapterDelete={(index) => handleChaptersChange(previewChapters.filter((_, i) => i !== index))}
                  chapters={formikProps.values.chapters}
                  tagsQuery={tags}
                  categories={categories.data ?? []}
                />

                <Grid
                  container item
                  direction={'column'}
                  xs={7}
                  justifyContent={'space-between'}
                >
                  <Preview 
                    title={previewTitle}
                    text={previewText}
                    category={previewCategory}
                    tags={previewTags}
                    chapters={previewChapters}
                  />
                </Grid>
              </Grid>

              <Box
                width={'100%'}
                display={'flex'}
                flexDirection={'row'}
                gap={'8px'}
              >
                <Button
                  // sx={{ height: '100px' }}
                  variant='contained'
                  sx={{ color: 'white' }}
                  onClick={() => {
                    const data: PartialArticleDto = {
                      categoryId: previewCategory?.id ?? null,
                      chapters: previewChapters,
                      tags: previewTags,
                      title: previewTitle,
                      text: previewText
                    }

                    if (articleId != null) {
                      saveArticle.mutate(data)
                    } else {
                      addArticle.mutate(data)
                    }
                  }}
                >
                  { articleId != null ? 'Zapisz' : 'Dodaj' }
                </Button>

                {
                  articleId != null &&
                  <Button
                    type='submit'
                    // sx={{ height: '100px' }}
                    variant='contained'
                    sx={{ color: 'white' }}
                  >
                    Przeka?? do redakcji
                  </Button>
                }

                {
                  articleId != null &&
                  <Button
                    // sx={{ height: '100px' }}
                    variant='contained'
                    sx={{ color: 'lightRed' }}
                    onClick={() => deleteArticle.mutate(articleId)}
                  >
                    Usu??
                  </Button>
                }
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </MainLayout>
  )
}