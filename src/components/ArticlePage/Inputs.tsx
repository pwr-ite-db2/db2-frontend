import { Grid, TextField, Autocomplete, Box, Button } from '@mui/material';
import { textFieldSx } from './styles'
import { CategoryDto } from '../../types'
import { ChapterBlock } from './ChapterBlock';
import { UseQueryResult } from 'react-query';
import { Field, FieldArray, useFormik, useField } from 'formik';
import { ChapterDto } from '../../hooks/types';

type Props = {
  onTitleChange: (e: any) => void
  onTextChange: (e: any) => void
  onCategoryChange: (category: CategoryDto | null) => void
  onTagsChange: (tags: string[]) => void
  chapters: ChapterDto[]
  onChaptersChange: () => void
  onChapterDelete: (index: number) => void
  tagsQuery: UseQueryResult<{ name: string }[], unknown>
  categories: CategoryDto[]
  chosenCategory: CategoryDto | null
}

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
        gap={'24px'}
        justifyContent={'space-between'}
        xs={2}
      >
        <Grid
          container item
          direction={'column'}
          gap={'16px'}
          xs={5}
        >
          <Field name='title' as={TitleTextField} onKeyUp={props.onTitleChange}/>
          <Field as={Autocomplete}
            size="small"
            fullWidth
            renderInput={(params: any) => <TextField {...params} name='category' label='Kategoria'/>}
            getOptionLabel={(option: CategoryDto | undefined) => option?.name ?? ''}
            onChange={(e: any, category: CategoryDto) => props.onCategoryChange(category)}
            options={props.categories}
            value={props.chosenCategory}
          />
        </Grid>
        <Grid
          container item
          direction={'column'}
          xs={6.2}
        >
          <Field as={Autocomplete}
            name='tags'
            size="small"
            multiple
            freeSolo
            fullWidth
            renderInput={(params: any) => <TextField {...params} name='tags' label='Tagi'/>}
            onChange={(e: any, tags: any) => props.onTagsChange(tags)}
            options={props.tagsQuery.data?.map(t => t.name) ?? []}
            loading={props.tagsQuery.isLoading}
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
              sx={{ backgroundColor: 'lightgray', border: '1px solid' }}
              marginTop={'20px'}
              width={'100%'}
              height={'442px'}
              overflow={'scroll'}
              gap={'24px'}
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
                  alignSelf: 'center',
                  width: '200px',
                  margin: '16px',
                  color: 'white',
                  textTransform: 'none',
                  fontWeight: '700'
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

const TextTextField = (props: any) => {
  const [input, meta, helpers] = useField(props)
  
  return (
    <TextField
      error={meta.error}
      {...props}
      multiline
      fullWidth
      sx={textFieldSx}
      label={meta.error ?? 'Tekst'}
    />
  )
}

const TitleTextField = (props: any) => {
  const [input, meta, helpers] = useField(props)

  return (
    <TextField
      error={meta.error}
      {...props}
      size="small"
      label={meta.error ?? 'Tytuł'}
      fullWidth
    />
  )
}