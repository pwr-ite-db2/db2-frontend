import { debounce } from "@mui/material"
import { Box, Grid } from "@mui/material"
import { useState } from "react"
import { MainLayout } from "../components/common/MainLayout"
import { Form, Formik } from 'formik'
import { Inputs } from "../components/ArticlePage/Inputs"
import { Preview } from "../components/ArticlePage/Preview"
import { Headlines } from "../components/ArticlePage/Headlines"
import { CategoryDto } from "../types"
import useAddArticle from '../hooks/useAddArticle'
import useSaveArticle from '../hooks/useSaveArticle'
import useSaveAndFrowardArticleToRedaction from '../hooks/useSaveAndForwardArticleToRedaction'
import { ArticleDto, ChapterDto, DefaultArticleStyle, PartialArticleDto } from "../hooks/types"
import { publishArticleValidation } from '../valdiations/publishArticle'
import { LoadingButton } from '@mui/lab';
import { ConfirmDeleteDialog } from '../components/ArticlePage/ConfirmDeleteDialog';
import { ConfirmRollbackDialog } from "../components/ArticlePage/ConfirmRollbackDialog"
import { ConfirmForwardDialog } from "../components/ArticlePage/ConfirmForwardDialog"
import Button from "@mui/material/Button"
import { useNavigate } from "react-router-dom"

type FormData = {
  category: CategoryDto | null
  title: string
  text: string
  tags: string[]
  chapters: ChapterDto[]
}

type Props = {
  isRedactor: boolean
  article?: PartialArticleDto & { id: number }
  categories: CategoryDto[]
  tags: string[]
}

export const ArticlePageView = (props: Props) => {
  const navigate = useNavigate()

  const addArticle = useAddArticle()
  const saveArticle = useSaveArticle()
  const saveAndForwardArticleToRedaction = useSaveAndFrowardArticleToRedaction()

  const [previewTitle, setPreviewTitle] = useState(props.article?.title ?? '')
  const [previewText, setPreviewText] = useState(props.article?.text ?? '')
  const [previewCategory, setPreviewCategory] = useState<CategoryDto | null>(props.article?.category ?? props.categories[0])
  const [previewTags, setPreviewTags] = useState<string[]>(props.article?.tags.map(t => t.name) ?? [])
  const [previewChapters, setPreviewChapters] = useState<ChapterDto[]>(props.article?.chapters ?? [])

  const handleTextChange = debounce((text: string) => setPreviewText(text), 100)
  const handleTitleChange = debounce((title: string) => setPreviewTitle(title), 100)
  const handleChaptersChange = debounce((chapters: ChapterDto[]) => setPreviewChapters(chapters), 100)
  const handleTagsChange = debounce((tags: string[]) => setPreviewTags(tags), 100)
  const handleCategoryChange = debounce((category: CategoryDto | null) => setPreviewCategory(category), 100)

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [rollbackDialogOpen, setRollbackDialogOpen] = useState(false)
  const [forwardDialogOpen, setForwardDialogOpen] = useState(false)

  return (
    <MainLayout>
      <Box
        display={'flex'}
        flexDirection={'column'}
        gap={'16px'}
      >
        <Button 
          sx={{ 
            alignSelf: 'left', 
            width: '180px', 
            color: 'white',
            fontWeight: '700',
            textTransform: 'none'
          }} 
          variant="contained"
          onClick={() => navigate('/')}
        >
          Wróć do listy
        </Button>
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
            category: props.categories[0]
          }}
          onSubmit={(data) => {
            
            saveAndForwardArticleToRedaction.mutate({
            formData: {
              // ...data,
              title: data.title,
              text: data.text,
              category: data.category,
              chapters: data.chapters.map((c, i) => ({ orderNum: i + 1, text: c.text, subtitle: c.subtitle })),
              id: props.article!.id,
              tags: data.tags.map(t => ({ name: t })),
              style: DefaultArticleStyle
            } as ArticleDto & { id: number },
            type: props.isRedactor ? 'publish' : 'submit'
          })}}
          validationSchema={props.isRedactor ? publishArticleValidation : undefined}
          validateOnChange={false}
          validateOnBlur={false}
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
                <Headlines edit={Boolean(props.article)} isRedacting={props.isRedactor}/>
                <Inputs
                  onTextChange={() => {
                    if (formikProps.values.text) {
                      formikProps.errors.text =  undefined
                    }
                    handleTextChange(formikProps.values.text)
                  }}
                  onTitleChange={() => {
                    if (formikProps.values.title) {
                      formikProps.errors.title =  undefined
                    }
                    handleTitleChange(formikProps.values.title)
                  }}
                  onCategoryChange={(category) => {
                    formikProps.values.category = category
                    if (category) {
                      formikProps.errors.category = undefined
                    }
                    handleCategoryChange(category)
                  }}
                  onTagsChange={(tags) => { formikProps.values.tags = tags; handleTagsChange(tags)}}
                  onChaptersChange={() => handleChaptersChange(formikProps.values.chapters)}
                  onChapterDelete={(index) => handleChaptersChange(previewChapters.filter((_, i) => i !== index))}
                  chapters={formikProps.values.chapters}
                  tags={props.tags}
                  categories={props.categories}
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
                marginTop={'32px'}
                gap={'8px'}
              >
                <LoadingButton
                  loading={saveArticle.isLoading || addArticle.isLoading}
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
                  { props.article ? 'Zapisz' : 'Utwórz szkic artykułu' }
                </LoadingButton>

                {
                  props.article &&
                  <>
                    <LoadingButton
                      ///loading={saveAndForwardArticleToRedaction.isLoading}
                      //type='submit'
                      onClick={() => setForwardDialogOpen(true)}
                      variant='contained'
                      sx={{ 
                        color: 'white',
                        textTransform: 'none',
                        fontWeight: '700',
                      }}
                    >
                      {props.isRedactor ? 'Opublikuj' : 'Przekaż do redakcji'}
                    </LoadingButton>
                    <ConfirmForwardDialog
                      submit={() => formikProps.submitForm()}
                      onClose={() => setForwardDialogOpen(false)} 
                      open={forwardDialogOpen} 
                      articleId={props.article.id} 
                      articleTitle={props.article.title} 
                      type={props.isRedactor ? 'publish' : 'submit'}
                      isLoading={saveAndForwardArticleToRedaction.isLoading}
                    />
                  </>
                }

                {/* {
                  props.article && props.isRedactor && 
                  <>
                    <LoadingButton
                      // loading={rollbackArticle.isLoading}
                      variant='contained'
                      sx={{ 
                        color: 'white',
                        textTransform: 'none',
                        fontWeight: '700',
                        backgroundColor: 'darkorange',
                        ':hover': {
                          backgroundColor: '#a66101',
                        }
                      }}
                      onClick={() => setRollbackDialogOpen(true)}
                    >
                      Wycofaj do autora
                    </LoadingButton>
                    <ConfirmRollbackDialog onClose={() => setRollbackDialogOpen(false)} open={rollbackDialogOpen} articleId={props.article.id} articleTitle={props.article.title}/>
                  </>
                } */}

                {
                  props.article &&
                  <>
                    <LoadingButton
                      //loading={deleteArticle.isLoading}
                      variant='contained'
                      sx={{ 
                        color: 'white',
                        textTransform: 'none',
                        fontWeight: '700',
                        backgroundColor: 'red',
                        ':hover': {
                          backgroundColor: 'darkred'
                        }
                      }}
                      onClick={() => setDeleteDialogOpen(true)}
                    >
                      Usuń
                    </LoadingButton>
                    <ConfirmDeleteDialog onClose={() => setDeleteDialogOpen(false)} open={deleteDialogOpen} articleId={props.article.id} articleTitle={props.article.title}/>
                  </>
                }
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </MainLayout>
  )
}