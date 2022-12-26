import { Grid, TextField, Autocomplete, Box, Button } from '@mui/material';
import { textFieldSx } from './styles'
import { CategoryDto } from '../../types'
import { ChapterDto } from '../../pages/ArticlePage';
import { ChapterBlock } from './ChapterBlock';
import { useCallback, useState } from 'react';
import { Field, FieldArray } from 'formik';

type Props = {
  onTitleChange: (e: any) => void
  onTextChange: (e: any) => void
  onCategoryChange: (category: CategoryDto | null) => void
  onTagsChange: (tags: string[]) => void
  chapters: ChapterDto[]
  onChaptersChange: () => void
  onChapterDelete: (index: number) => void
}

const dummyCategories = [{ id: 1, name: 'Polityka'}, { id: 2, name: 'Kulinaria'}, { id: 3, name: 'Nauka'}]
const dummyTags = ['Pwr', 'piwo', 'prezydent']

export const Inputs = (props: Props) => {
  return (
    <Grid
      container item
      direction={'column'}
      height={'100%'}
      gap={'16px'}
      xs={4}
      justifyContent={'space-between'}
    >
      <Grid
        container item
        direction={'row'}
        xs={1}
      >
        <Grid
          container item
          xs={5}
        >
          <Field name='title' as={TitleTextField} onKeyUp={props.onTitleChange}/>
        </Grid>
      </Grid>

      <Grid
        container item
        direction={'row'}
        gap={'24px'}
        justifyContent={'space-between'}
        xs={1}
      >
        <Grid
          container item
          xs={5}
        >
          <Autocomplete<CategoryDto, false, true, false>
            size="small"
            fullWidth
            renderInput={(params) => <TextField {...params} name='category' label='Kategoria'/>}
            getOptionLabel={(option) => option.name}
            onChange={(e, category) => props.onCategoryChange(category)}
            options={dummyCategories} //TODO endpoint
          />
        </Grid>
        <Grid
          container item
          xs={5}
        >
          <Autocomplete<string, true, true, true>
            size="small"
            multiple
            freeSolo
            fullWidth
            renderInput={(params) => <TextField {...params} name='tags' label='Tagi'/>}
            onChange={(e, tags) => props.onTagsChange(tags)}
            // onChange={(e, value) => props.onCategoryChange(value)}
            options={dummyTags} //TODO endpoint
          />
        </Grid>
      </Grid>

      <Grid
        container item
        xs={10}
      >
        <Field name='text' as={TextTextField} onKeyUp={props.onTextChange}/>

        <FieldArray
          name='chapters'
          render={(arrayHelpers) => (
            <Box
              display={'flex'}
              flexDirection={'column'}
              sx={{ backgroundColor: 'lightgray' }}
              marginTop={'20px'}
              height={'260px'}
              width={'100%'}
              overflow={'scroll'}
              gap={'14px'}
            >
              {props.chapters.map((chapter, index) => 
                <ChapterBlock
                  chapter={chapter}
                  key={index}
                  index={index}
                  onDelete={() => { arrayHelpers.remove(index); props.onChapterDelete(index) }}
                  onChange={props.onChaptersChange}
                />
              )}
              <Button 
                variant='contained' 
                sx={{ 
                  margin: '16px 40px 16px 40px',
                  color: 'white' 
                }}
                onClick={() => { arrayHelpers.push({ title: '', text: '' }); props.onChaptersChange() }}
              >
                Dodaj rozdział
              </Button>
             </Box>
          )}
        />
      </Grid>
    </Grid>
  )
}

const TextTextField = (props: any) => (
  <TextField
    {...props}
    multiline
    fullWidth
    sx={textFieldSx}
    label='Tekst'
  />
)
const TitleTextField = (props: any) => (
  <TextField
    {...props}
    size="small"
    label="Tytuł"
    fullWidth
  />
)