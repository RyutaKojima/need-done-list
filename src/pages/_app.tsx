import React from 'react'
import { AppProps } from 'next/app'
import NoneLayout from '../components/layout/NoneLayout'
import MainLayout from '../components/layout/MainLayout'
import { EnumLayout, TypeLayout } from '../types/types'

const App = ({ Component, pageProps }: AppProps) => {
  const title: string =
    typeof pageProps.title === 'string' ? pageProps.title : ''
  const layout: TypeLayout =
    typeof pageProps.layout === 'string' ? pageProps.layout : EnumLayout.default

  return pageProps.layout === 'main' ? (
    <MainLayout title={title} layout={layout}>
      <Component {...pageProps} />
    </MainLayout>
  ) : (
    <NoneLayout title={title} layout={layout}>
      <Component {...pageProps} />
    </NoneLayout>
  )
}

export default App
