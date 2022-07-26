import { useState, useEffect } from 'react'
import { ReactBricks } from 'react-bricks/frontend'
import type { AppProps } from 'next/app'
import config from '../react-bricks/config'
import { useRouter } from 'next/router'

import '../css/styles.css'
import * as ga from '../lib/ga'

const MyApp = ({ Component, pageProps }: AppProps) => {
  // Color Mode Management
  const savedColorMode =
    typeof window === 'undefined' ? '' : localStorage.getItem('color-mode')
  const [colorMode, setColorMode] = useState(savedColorMode || 'light')
  const toggleColorMode = () => {
    const newColorMode = colorMode === 'light' ? 'dark' : 'light'
    setColorMode(newColorMode)
    localStorage.setItem('color-mode', newColorMode)
  }

  const reactBricksConfig = {
    ...config,
    isDarkColorMode: colorMode === 'dark',
    toggleColorMode,
    contentClassName: `antialiased font-content ${colorMode} ${
      colorMode === 'dark' ? 'bg-gray-900' : 'bg-white'
    }`,
  }

  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url) => {
      ga.pageview(url)
    }
    //When the component is mounted, subscribe to router changes
    //and log those page views
    router.events.on('routeChangeComplete', handleRouteChange)

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <ReactBricks {...reactBricksConfig}>
      <Component {...pageProps} />
    </ReactBricks>
  )
}

export default MyApp
