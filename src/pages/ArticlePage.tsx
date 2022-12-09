import { Typography } from "@mui/material";
import { Box, Grid, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { useCallback, useEffect, useState } from "react"
import { MainLayout } from "../components/common/MainLayout";
import { Form, Formik } from 'formik'

export const ArticlePage = (props: { articleId?: number }) => {

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
                direction={'column'}
                width={'100%'}
                gap={'12px'}
              >
                <Grid
                  container item
                  xs={12}
                  direction={'row'}
                >
                  <TextField
                    //value='lalla'
                    name="title"
                    label="Tytuł"
                    error={true}
                  />
                </Grid>
                <Grid
                  container item
                  xs={12}
                  direction={'row'}
                >

                </Grid>
              </Grid>

              <Button
                type='submit'
                // sx={{ height: '100px' }}
                variant='contained'
                color={'secondary'}
              >
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </MainLayout>
  )
}