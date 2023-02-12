import { Router, useRouter } from 'next/router'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import NProgress from 'nprogress'
import { CacheProvider } from '@emotion/react'
import type { EmotionCache } from '@emotion/cache'
import createEmotionCache from '../app/create-emotion-cache'
import { useEffect } from 'react'
import { SnackbarProvider } from 'notistack'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { ar, enGB } from 'date-fns/locale'
import ThemeComponent from '../app/ThemeComponent'
import { Grow } from '@mui/material'

// ** Extend App Props with Emotion
type ExtendedAppProps = AppProps & {
  Component: NextPage
  emotionCache: EmotionCache
}

Router.events.on('routeChangeStart', () => {
  NProgress.start()
})
Router.events.on('routeChangeError', () => {
  NProgress.done()
})
Router.events.on('routeChangeComplete', () => {
  NProgress.done()
})

// ** Configure JSS & ClassName
const App = (props: ExtendedAppProps) => {
  const router = useRouter()
  const clientSideEmotionCache = createEmotionCache(router.locale !== 'en')
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.dir = router.locale === 'en' ? 'ltr' : 'rtl'
    }
  }, [router.locale])

  return (
    <CacheProvider value={emotionCache}>
      <ThemeComponent>
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={router.locale === 'en' ? enGB : ar}>
          <SnackbarProvider TransitionComponent={Grow}>
            <Component {...pageProps} />
          </SnackbarProvider>
        </LocalizationProvider>
      </ThemeComponent>
    </CacheProvider>
  )
}

export default App
