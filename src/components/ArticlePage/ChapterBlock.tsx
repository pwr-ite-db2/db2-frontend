import { useMemo } from "react"
import { Box, TextField, Grid, Typography, debounce } from '@mui/material';
import { textFieldSx } from "./styles";
import CancelIcon from '@mui/icons-material/Cancel';
import IconButton from "@mui/material/IconButton";
import { useFormik, Field, useField } from 'formik';
import { ChapterDto } from "../../hooks/types";

type Props = {
  onChange: () => void
  chapter: ChapterDto
  index: number
  onDelete: () => void
}

export const ChapterBlock = (props: Props) => {
  return (
    <Grid
      key={props.index}
      container item
      direction={'column'}
      width={'100%'}
      padding={'4px 10px 4px 10px'}
      gap={'16px'}
    >
      <Box 
        display={'flex'}
        flexDirection={'row'} 
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <Typography variant="chapter">Rozdział {props.index + 1}</Typography>
        <IconButton onClick={props.onDelete}>
          <CancelIcon style={{ color: 'red' }}/>
        </IconButton>
      </Box>

      <Field
        name={`chapters[${props.index}].subtitle`}
        onKeyUp={props.onChange}
        as={SubitleTextField}
      />
      <Field
        name={`chapters[${props.index}].text`}
        onKeyUp={props.onChange}
        as={TextTextField}
      />
    </Grid>
  )
}

const SubitleTextField = (props: any) => (
  <TextField
    {...props}
    size="small"
    label={`Tytuł`}
    sx={{ background: 'white', '.MuiInputBase-input': { fontSize: '14px'} }}
    fullWidth
  />
)

const TextTextField = (props: any) => (
  <TextField
    {...props}
    multiline
    fullWidth
    sx={{ ...textFieldSx, backgroundColor: 'white' }}
    //name={`chapters[${props.index}].text`}
    label={`Tekst`}
  />
)