import { Box, Typography } from "@mui/material"
import { useTheme } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

type Props = {
  name?: string
  role?: string
}

export const Header = (props: Props) => {
  const theme = useTheme()
  //TODO from login
  const name = props.name ?? 'Autor'

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
      <AccountCircleIcon sx={{ color: 'white' }}/>
      { name && 
        <Typography 
          fontSize={'20px'}
          color={'white'}
        >
          {name}
        </Typography> 
      }
    </Box>
  )
}