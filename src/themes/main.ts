import { createTheme } from '@mui/material'

declare module "@mui/material/styles" {
  interface TypographyVariants {
    category: React.CSSProperties;
    tag: React.CSSProperties;
    chapter: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    category?: React.CSSProperties;
    tag?: React.CSSProperties;
    chapter?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    category: true;
    tag: true;
    chapter: true;
  }
}

let MainTheme = createTheme({
  palette: {
    primary: {
      main: '#01baf5'
    },
  },
  typography: {
    category: {
      fontSize: '14px',
      fontStyle: 'italic',
      backgroundColor: '#ffca81',
      padding: '4px 8px 4px 8px',
      borderRadius: '24px',
      width: 'fit-content',
      fontWeight: '700'
    },
    tag: {
      fontSize: '10px',
      fontStyle: 'italic',
      backgroundColor: '#dbb8ff',
      padding: '4px 8px 4px 8px',
      borderRadius: '24px',
      width: 'fit-content',
      fontWeight: '700'
    },
    chapter: {
      fontSize: '14px',
      fontStyle: 'bold',
      fontWeight: '700'
    },
    h1: {
      fontSize: '32x',
      fontWeight: '700'
    },
    h2: {
      fontSize: '28px',
      fontWeight: '500'
    }
  },
})

MainTheme = createTheme(MainTheme, {
  
})

export default MainTheme