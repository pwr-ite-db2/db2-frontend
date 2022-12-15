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

export const ArticlePage = (props: { articleId?: number }) => {
  const [previewTitle, setPreviewTitle] = useState('')
  const [previewText, setPreviewText] = useState('')
  const [previewCategory, setPreviewCategory] = useState<CategoryDto | null>(null)
  const [previewTags, setPreviewTags] = useState<string[]>([])

  const handleTextChange = debounce((text: string) => setPreviewText(text), 50)
  const handleTitleChange = debounce((title: string) => setPreviewTitle(title), 50)
  const handleCategoryChange = debounce((category: CategoryDto | null) => setPreviewCategory(category), 50)
  const handleTagsChange = debounce((tags: string[]) => setPreviewTags(tags), 50)

  return (
    <MainLayout>
      <Box
        display={'flex'}
        flexDirection={'column'}
        gap={'16px'}
      >

        <Formik
          initialValues={{
            title: '',
            text: '',
            tags: []
          }}
          onSubmit={() => {}}
        >
          {(formikProps) => (
            <Form>
              <Grid
                container
                direction={'row'}
                width={'100%'}
                height={'100%'}
                justifyContent={'space-between'}
              >
                <Headlines edit={props.articleId != null} />
        
                <Inputs
                  onTextChange={handleTextChange}
                  onTitleChange={handleTitleChange}
                  onCategoryChange={handleCategoryChange}
                  onTagsChange={handleTagsChange}
                />

                <Grid
                  container item
                  direction={'column'}
                  gap={'12px'}
                  xs={6}
                  justifyContent={'space-between'}
                >
                  <Preview 
                    title={previewTitle}
                    text={previewText}
                    category={previewCategory}
                    tags={previewTags}
                  />
                </Grid>
              </Grid>

              <Button
                type='submit'
                // sx={{ height: '100px' }}
                variant='contained'
                sx={{ color: 'white' }}
              >
                Zapisz
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </MainLayout>
  )
}