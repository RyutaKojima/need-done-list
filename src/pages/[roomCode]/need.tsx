import { useRouter } from 'next/router'
import React from 'react'
import { GetServerSideProps, NextPage } from 'next'
import { EnumLayout, WithBaseProps } from '../../types/types'
import {
  Toolbar,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core'

type PageProps = WithBaseProps<{}>

export const getServerSideProps: GetServerSideProps<PageProps> = async () => {
  return {
    props: {
      title: '候補の一覧',
      layout: EnumLayout.main,
    },
  }
}

const PageComponent: NextPage<PageProps> = () => {
  const router = useRouter()

  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    router.push(newValue)
  }

  const roomCode: string =
    typeof router.query.roomCode === 'string' ? router.query.roomCode : ''

  return (
    <>
      <Toolbar className="w-full">
        <Tabs
          value={`/${roomCode}/need`}
          onChange={handleChange}
          aria-label="tabs"
        >
          <Tab label="候補の一覧" value={`/${roomCode}/need`} />
          <Tab label="達成した一覧" value={`/${roomCode}/done`} />
        </Tabs>
      </Toolbar>

      <List component="nav" aria-label="secondary mailbox folders">
        <ListItem button>
          <ListItemText primary="アイテム１" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="アイテム２" />
        </ListItem>
      </List>
    </>
  )
}

export default PageComponent
