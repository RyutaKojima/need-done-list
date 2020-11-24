import React from 'react'
import { BasePageProps } from '../../types/types'
import BaseLayout from './BaseLayout'

const NoneLayout: React.FC<BasePageProps> = ({ layout, title, children }) => {
  return (
    <BaseLayout layout={layout} title={title}>
      <main>{children}</main>
    </BaseLayout>
  )
}

export default NoneLayout
