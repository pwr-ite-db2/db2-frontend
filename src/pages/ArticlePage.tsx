import { debounce, Typography } from "@mui/material";
import { Box, Grid, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { useCallback, useEffect, useState } from "react"
import { MainLayout } from "../components/common/MainLayout";
import { Form, Formik } from 'formik'
import { Inputs } from "../components/ArticlePage/Inputs";
import { Preview } from "../components/ArticlePage/Preview";
import { Headlines } from "../components/ArticlePage/Headlines";
import { CategoryDto, TagDto } from "../types";

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
          onSubmit={(data) => {console.log(data)}}
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
                  type='submit'
                  // sx={{ height: '100px' }}
                  variant='contained'
                  sx={{ color: 'white' }}
                >
                  Zapisz
                </Button>

                <Button
                  type='submit'
                  // sx={{ height: '100px' }}
                  variant='contained'
                  sx={{ color: 'white' }}
                >
                  Przekaż do redakcji
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </MainLayout>
  )
}