import { createTheme } from '@mui/material'

let MainTheme = createTheme({
  palette: {
    primary: {
      main: '#01baf5'
    },
  },
  typography: {
    h1: {
      fontSize: '28px',
      fontWeight: '700'
    }
  },
})

MainTheme = createTheme(MainTheme, {
  
})

export default MainTheme