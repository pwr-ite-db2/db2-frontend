import { LoadingButton } from "@mui/lab";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { MainLayout } from "../components/common/MainLayout"
import { getUser, Roles } from "../hooks/store";
import useGetArticleList from '../hooks/useGetArticles';
import LoadingPage from "./LoadingPage";

export const ArticleList = () => {
  const navigate = useNavigate();
  const userRole = getUser()?.role
  const articles = useGetArticleList(userRole === 'AUTOR')
  
  if (articles.isLoading) {
    return <LoadingPage/>
  }

  return (
    <MainLayout>
      <Box
        width={'50%'}
        height={'fit-content'}
        display={'flex'}
        flexDirection={'column'}
        margin={'0 25%'}
        gap={'20px'}
      >
        {
          userRole === Roles.AUTOR
          ? <LoadingButton
              variant='contained'
              sx={{ 
                color: 'white',
                textTransform: 'none',
                fontWeight: '700',
                fontSize: '25px',
                width: 'fit-content',
                alignSelf: 'center',
                marginBottom: '30px'
              }}
              onClick={() => {
                navigate(`/articles/manage`)
              }}
            >
              Utwórz nowy artykuł
            </LoadingButton>
          : null
        }
        {
          articles.data!.map((article, index) => 
            <Box
              key={index}
              padding={'10px'}
              border={'1px solid #000'}
              borderRadius={'10px'}
              bgcolor={'#F0F0F0'}
            >
              <Typography variant='h5' marginBottom={'10px'}>
                {article.title}
              </Typography>
              <Typography variant='body2'>
                {article.text}
              </Typography>
              <Box
                display={'flex'}
                justifyContent={'flex-end'}
              >
                <LoadingButton
                  variant='contained'
                  sx={{ 
                    color: 'white',
                    textTransform: 'none',
                    fontWeight: '700'
                  }}
                  onClick={() => {
                    console.log(article.id)
                    navigate(`/articles/manage/?id=${article.id}`)
                  }}
                >
                  {
                    userRole === Roles.REDAKTOR
                    ? "Redaguj artykuł"
                    : "Edytuj artykuł"
                  }
                </LoadingButton>
              </Box>
            </Box>
          )
        }
      </Box>
    </MainLayout>
  )
}