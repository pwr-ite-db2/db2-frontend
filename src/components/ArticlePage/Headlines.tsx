import { Grid, Typography } from '@mui/material';

export const Headlines = (props: { edit: boolean }) => {
  return (
    <Grid
      container item
      xs={12}
      marginBottom={'24px'}
      direction={'row'}
    >
      <Grid
        container item
        xs={5}
        direction={'row'}
      >
        <Typography variant='h2'>
          { props.edit ? 'Edytowanie artykułu' : 'Dodawanie artykułu'}
        </Typography>
      </Grid>

      <Grid
        container item
        xs={7}
        direction={'row'}
      >
        <Typography variant='h2'>Podgląd</Typography>
      </Grid>
    </Grid>
  )
}