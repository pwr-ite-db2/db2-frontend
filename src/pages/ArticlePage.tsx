import { Typography } from "@mui/material";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react"
import { MainLayout } from '../components/common/MainLayout';

export const ArticlePage = (props: { articleId?: number }) => {

  const [arr, updateArr] = useState<number>(1)

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
        
        <Button
          sx={{ width: '100px' }}
          variant='contained'
          onClick={() => updateArr(arr + 1)}
        >
          Yolo
        </Button>
      </Box>
    </MainLayout>
  )
}