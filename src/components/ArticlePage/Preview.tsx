import { Box, Typography } from '@mui/material';
import parse from 'react-html-parser'
import { CategoryDto, TagDto } from '../../types';

type Props = {
  category?: CategoryDto | null
  tags?: string[]
  title?: string
  text?: string
  chapters?: {
    title?: string
    text?: string
  }[]
}

export const Preview = (props: Props) => {
  return (
    <Box
      height={'70vh'}
      display={'flex'}
      flexDirection={'column'}
      padding={'8px 16px 8px 16px'}
      overflow={'scroll'}
      sx={{
        borderWidth: 2,
        borderColor: 'red',
        backgroundColor: '#f0f0f0'
      }}
    >
      <Typography variant='category'>{props.category?.name ?? '<<CATEGORY>>'}</Typography>
      <Typography
        fontSize={'24px'}      //TODO from article style
        sx={{ fontWeight: 700 }}
        width={'100%'}
        textAlign={'center'}
      >
        {props.title ? props.title : '<<TITLE>>'}
      </Typography>
      <Typography 
        sx={{ fontSize: '18px' }} //TODO from article style
      >
        {props.text ? parse(props.text.replace(/\n/g, '</br>')) : ' '}
      </Typography>

      <Box width={'100%'} display={'flex'} flexDirection={'row'} gap={'8px'}>
        {
          props.tags && props.tags.length > 0 &&
          props.tags.map(tag => (
            <Typography variant='tag'>{tag}</Typography>
          ))
        }
      </Box>
    </Box>
  )
}