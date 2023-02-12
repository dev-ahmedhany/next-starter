import { ReactNode } from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import GlobalStyles from '@mui/material/GlobalStyles'
import {
  Experimental_CssVarsProvider as CssVarsProvider,
  experimental_extendTheme as extendTheme,
  responsiveFontSizes,
  CssVarsTheme,
  Theme
} from '@mui/material/styles'
import { amber, blue } from '@mui/material/colors'

interface Props {
  children: ReactNode
}

const themeConfig = {
  colorSchemes: {
    light: {
      palette: {
        primary: blue
      }
    },
    dark: {
      palette: {
        primary: amber
      }
    }
  }
}

const ThemeComponent = ({ children }: Props) => {
  let theme = responsiveFontSizes(extendTheme(themeConfig)) as Omit<Theme, 'palette'> & CssVarsTheme

  return (
    <CssVarsProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          '#nprogress': {
            pointerEvents: 'none',
            '& .bar': {
              left: 0,
              top: 0,
              height: 3,
              width: '100%',
              zIndex: 2000,
              position: 'fixed',
              backgroundColor: 'var(--mui-palette-primary-main)'
            }
          }
        }}
      />
      {children}
    </CssVarsProvider>
  )
}

export default ThemeComponent
