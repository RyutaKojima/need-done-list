import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { GetServerSideProps, NextPage } from 'next'
import { EnumLayout, RoomData, WithBaseProps } from '../../types/types'
import {
  List,
  ListItem,
  ListItemText,
  Tab,
  Tabs,
  Toolbar,
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

  const [initialized, setInitialized] = useState<boolean>(false)
  const [room, setRoom] = useState<RoomData>({ name: null })
  const [tickets, setTickets] = useState<firebase.firestore.DocumentData[]>([])

  const roomCode: string =
    typeof router.query.roomCode === 'string' ? router.query.roomCode : ''

  useEffect(() => {
    if (!initialized) {
      setInitialized(true)

      const fetchRoom = async () => {
        const snapshot = await firestore.collection('Rooms').doc(roomCode).get()

        if (!snapshot.exists) {
          return
        }

        const room: RoomData = snapshot.data() as RoomData
        if (!room) {
          return
        }

        setRoom(room)
      }

      fetchRoom()

      firestore.collection('Tickets').onSnapshot({
        // complete: () => {
        //   console.log('complete')
        // },
        // error: (error) => {
        //   console.log('error')
        //   console.log(error)
        // },
        next: (snapshot) => {
          if (snapshot.empty) {
            return
          }

          const newTickets: firebase.firestore.DocumentData[] = []
          snapshot.forEach((doc) => {
            newTickets.push(doc.data())
          })

          setTickets(newTickets)
        },
      })
    }
  })

  console.log('room', room)
  console.log('tickets', tickets)

  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    router.push(newValue)
  }

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
