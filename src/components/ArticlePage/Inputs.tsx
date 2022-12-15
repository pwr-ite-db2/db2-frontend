import { Grid, TextField, Autocomplete } from '@mui/material'
import { textFieldSx } from './styles'
import { CategoryDto, TagDto } from '../../types'

type Props = {
  onTitleChange: (title: string) => void
  onTextChange: (text: string) => void
  onCategoryChange: (category: CategoryDto | null) => void
  onTagsChange: (tags: string[]) => void
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
      xs={5}
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
          <TextField
            size="small"
            name="title"
            label="Tytuł"
            onChange={(event) => props.onTitleChange(event.target.value)}
            fullWidth
          />
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
        <TextField
          multiline
          fullWidth
          sx={textFieldSx}
          name='text'
          label='Text'
          onChange={(event) => props.onTextChange(event.target.value)}
        />
      </Grid>
    </Grid>
  )
}