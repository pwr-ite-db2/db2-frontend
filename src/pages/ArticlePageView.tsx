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
import { ArticleDto, ChapterDto, DefaultArticleStyle, PartialArticleDto } from "../hooks/types"
import useGetCategories from "../hooks/useGetCategories"
import useGetTags from "../hooks/useGetTags"


type FormData = {
  category: CategoryDto | null
  title: string
  text: string
  tags: string[]
  chapters: ChapterDto[]
}

export const ArticlePageView = (props: { article?: PartialArticleDto & { id : number } }) => {
  const tags = useGetTags()
  const categories = useGetCategories()
  const addArticle = useAddArticle()
  const deleteArticle = useDeleteArticle()
  const saveArticle = useSaveArticle()
  const saveAndForwardArticleToRedaction = useSaveAndFrowardArticleToRedaction()

  const [previewTitle, setPreviewTitle] = useState(props.article?.title ?? '')
  const [previewText, setPreviewText] = useState(props.article?.text ?? '')
  const [previewCategory, setPreviewCategory] = useState<CategoryDto | null>(props.article?.category ?? null)
  const [previewTags, setPreviewTags] = useState<string[]>(props.article?.tags.map(t => t.name) ?? [])
  const [previewChapters, setPreviewChapters] = useState<ChapterDto[]>(props.article?.chapters ?? [])

  const handleTextChange = debounce((text: string) => setPreviewText(text), 100)
  const handleTitleChange = debounce((title: string) => setPreviewTitle(title), 100)
  const handleChaptersChange = debounce((chapters: ChapterDto[]) => setPreviewChapters(chapters), 100)
  const handleTagsChange = debounce((tags: string[]) => setPreviewTags(tags), 100)
  const handleCategoryChange = debounce((category: CategoryDto | null) => setPreviewCategory(category), 100)

  return (
    <MainLayout>
      <Box
        display={'flex'}
        flexDirection={'column'}
        gap={'16px'}
      >

        <Formik<FormData>
          initialValues={props.article ? {
            title: props.article.title,
            text: props.article.text,
            tags: props.article.tags.map(t => t.name),
            chapters: props.article.chapters,
            category: props.article.category
          } : {
            title: '',
            text: '',
            tags: [],
            chapters: [],
            category: null
          }}
          // validate={}
          onSubmit={(data) => saveAndForwardArticleToRedaction.mutate({
            formData: {
              ...data,
              id: props.article!.id,
              tags: data.tags.map(t => ({ name: t })),
              style: DefaultArticleStyle
            } as ArticleDto & { id: number },
            type: 'submit'
          })}
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
                <Headlines edit={Boolean(props.article)} />
        
                <Inputs
                  onTextChange={() => handleTextChange(formikProps.values.text)}
                  onTitleChange={() => handleTitleChange(formikProps.values.title)}
                  onCategoryChange={(category) => { formikProps.values.category = category; handleCategoryChange(category)}}
                  onTagsChange={(tags) => { formikProps.values.tags = tags; handleTagsChange(tags)}}
                  onChaptersChange={() => handleChaptersChange(formikProps.values.chapters)}
                  onChapterDelete={(index) => handleChaptersChange(previewChapters.filter((_, i) => i !== index))}
                  chapters={formikProps.values.chapters}
                  tagsQuery={tags}
                  categories={categories.data ?? []}
                  chosenCategory={previewCategory}
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
                  sx={{ 
                    color: 'white',
                    textTransform: 'none',
                    fontWeight: '700'
                  }}
                  onClick={() => {
                    const data: PartialArticleDto = {
                      style: DefaultArticleStyle,
                      category: previewCategory,
                      chapters: previewChapters.map((c, i) => ({ ...c, orderNum: i })),
                      tags: previewTags.map(t => ({ name: t })),
                      title: previewTitle,
                      text: previewText
                    }

                    if (props.article) {
                      saveArticle.mutate({ ...data, id: props.article.id })
                    } else {
                      addArticle.mutate(data)
                    }
                  }}
                >
                  { props.article ? 'Zapisz' : 'Dodaj' }
                </Button>

                {
                  props.article &&
                  <Button
                    type='submit'
                    variant='contained'
                    sx={{ 
                      color: 'white',
                      textTransform: 'none',
                      fontWeight: '700',
                    }}
                  >
                    Przekaż do redakcji
                  </Button>
                }

                {
                  props.article &&
                  <Button
                    // sx={{ height: '100px' }}
                    variant='contained'
                    sx={{ 
                      color: 'white',
                      textTransform: 'none',
                      fontWeight: '700',
                      backgroundColor: 'red'
                    }}
                    onClick={() => deleteArticle.mutate(props.article!.id)}
                  >
                    Usuń
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