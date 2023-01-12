import { Box, Typography } from "@mui/material"
import { useTheme } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { UserData } from '../../hooks/useLogin';

export const Header = () => {
  const theme = useTheme()
  const email = UserData.email

  return (
    <Box
      height={'40px'}
      display={'flex'}
      flexDirection={'row-reverse'}
      alignItems={'center'}
      padding={'0 20px 0 20px'}
      sx={{ backgroundColor: theme.palette.primary.main }}
      gap={'12px'}
    >
      { UserData.authToken &&
        <>
          <AccountCircleIcon sx={{ color: 'white' }}/>
          <Typography 
            fontSize={'20px'}
            color={'white'}
          >
            {UserData.role}
          </Typography> 
        </> 
      }
    </Box>
  )
}