import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
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
import firebase from 'firebase/app'
import { firestore } from '../../library/firebase'

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

  const [users, setUsers] = useState<firebase.firestore.DocumentData[]>([])

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await firestore.collection('users').get()

      if (res.empty) {
        return
      }

      const userList: firebase.firestore.DocumentData[] = []
      res.forEach((doc) => {
        userList.push(doc.data())
      })

      setUsers(userList)
    }

    if (users.length === 0) {
      fetchUsers()
    }
  })

  console.log(users)

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
