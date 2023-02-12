import createCache from '@emotion/cache'
import rtlPlugin from 'stylis-plugin-rtl'
import { prefixer } from 'stylis'

const createEmotionCache = (isRtl: boolean) => {
  const cacheLtr = createCache({
    key: 'muiltr'
  })
  const cacheRtl = createCache({
    key: 'muirtl',

    // prefixer is the only stylis plugin by default, so when
    // overriding the plugins you need to include it explicitly
    // if you want to retain the auto-prefixing behavior.
    stylisPlugins: [prefixer, rtlPlugin]
  })

  return isRtl ? cacheRtl : cacheLtr
}

export default createEmotionCache
