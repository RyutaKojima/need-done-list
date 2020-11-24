import React from 'react'
import { BasePageProps } from '../../types/types'
import BaseLayout from './BaseLayout'
import { AppBar, Toolbar } from '@material-ui/core'
import MyLink from '../common/MyLink'

const MainLayout: React.FC<BasePageProps> = ({ layout, title, children }) => {
  return (
    <BaseLayout layout={layout} title={title}>
      <AppBar position="sticky" color="inherit">
        <Toolbar>
          <MyLink href="/">{`Logo: ${layout}`}</MyLink>
        </Toolbar>
      </AppBar>

      <main>{children}</main>
    </BaseLayout>
  )
}

export default MainLayout
