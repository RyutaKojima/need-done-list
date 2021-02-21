import { NextPage } from 'next'
import { WithBaseProps } from '../../types/types'
import React from 'react'
import { useRouter } from 'next/router'
import { useInitialize } from '../../hooks/useInitialize'

type PageProps = WithBaseProps<{}>

const PageComponent: NextPage<PageProps> = () => {
  const router = useRouter()

  useInitialize(() => {
    const nextPath = `/${router.query.roomCode}/need`
    router.push(nextPath)
  })

  return <div />
}

export default PageComponent
