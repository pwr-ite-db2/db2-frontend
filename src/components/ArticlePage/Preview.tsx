import { Trans } from 'react-i18next';
import { Typography } from '@mui/material';
import parse from 'react-html-parser'

type Props = {
  title?: string
  text?: string
  chapters?: {
    title?: string
    text?: string
  }[]
}

export const Preview = (props: Props) => {
  return (
    <Typography>
      {parse(props.text ?? '')}
    </Typography>
  )
}