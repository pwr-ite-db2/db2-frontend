import { Grid, TextField } from '@mui/material'

type Props = {
  onTitleChange: (title: string) => void
  onTextChange: (text: string) => void
}

export const Inputs = (props: Props) => {
  return (
    <Grid
      container item
      direction={'column'}
      height={'100%'}
      gap={'12px'}
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
          <TextField
            size="small"
            name="category"
            label="Kategoria"
            fullWidth
          />
        </Grid>
        <Grid
          container item
          xs={5}
        >
          <TextField
            size="small"
            name="tags"
            label="Tagi"
            fullWidth
          />
        </Grid>
      </Grid>

      <Grid
        container item
        xs={10}
      >
        <TextField
          name='text'
          onChange={(event) => props.onTextChange(event.target.value)}
        />
      </Grid>
    </Grid>
  )
}