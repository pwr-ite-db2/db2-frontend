import { debounce, Typography } from "@mui/material";
import { Box, Grid, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { useCallback, useEffect, useState } from "react"
import { MainLayout } from "../components/common/MainLayout";
import { Form, Formik } from 'formik'
import { Inputs } from "../components/ArticlePage/Inputs";
import { Preview } from "../components/ArticlePage/Preview";
import { Trans } from 'react-i18next'

export const ArticlePage = (props: { articleId?: number }) => {
  const [previewTitle, setPreviewTitle] = useState('')
  const [previewText, setPreviewText] = useState('')

  const handleTextChange = debounce((text: string) => setPreviewText(text), 50)
  const handleTitleChange = debounce((text: string) => setPreviewTitle(text), 50)

  return (
    <MainLayout>
      <Box
        display={'flex'}
        flexDirection={'column'}
        gap={'16px'}
      >
        <Typography variant='h1'>
          { props.articleId != null ? 'Edytowanie artykułu' : 'Dodawanie artykułu'}
        </Typography>

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
                <Inputs
                  onTextChange={handleTextChange}
                  onTitleChange={handleTitleChange}
                />

                <Grid
                  container item
                  direction={'column'}
                  gap={'12px'}
                  xs={5}
                  justifyContent={'space-between'}
                  sx={{backgroundColor: 'red'}}
                >
                  <Preview 
                    title={previewTitle}
                    text={previewText}
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