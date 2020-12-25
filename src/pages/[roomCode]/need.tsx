import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { GetServerSideProps, NextPage } from 'next'
import {
  EnumLayout,
  RoomData,
  TicketData,
  WithBaseProps,
} from '../../types/types'
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
import { useInitialize } from '../../hooks/useInitialize'

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

  const [room, setRoom] = useState<RoomData | null>(null)
  const [tickets, setTickets] = useState<firebase.firestore.DocumentData[]>([])

  const roomCode: string =
    typeof router.query.roomCode === 'string' ? router.query.roomCode : ''

  useInitialize(() => {
    const fetchRoom = async () => {
      const snapshot = await firestore.collection('Rooms').doc(roomCode).get()

      if (!snapshot.exists) {
        return
      }

      const docData = snapshot.data()
      if (!docData) {
        return
      }
      const room: RoomData = {
        name: docData.name,
        password: docData.password,
        createdAt: docData.createdAt,
      }

      setRoom(room)
    }

    fetchRoom()

    return firestore
      .collection('Tickets')
      .where('room', '==', roomCode)
      .onSnapshot({
        error: (error) => {
          console.error('Firestore error: Tickets', error)
        },
        next: (snapshot) => {
          if (snapshot.empty) {
            return
          }

          const newTickets: TicketData[] = []
          snapshot.forEach((doc) => {
            const data = doc.data()

            newTickets.push({
              id: doc.id,
              roomId: data.roomId,
              title: data.title,
              description: data.description,
              url: data.url,
              doneAt: data.doneAt,
            } as TicketData)
          })

          setTickets(newTickets)
        },
      })
  })

  // TODO: 消す
  // eslint-disable-next-line no-console
  console.log('room', room)
  // eslint-disable-next-line no-console
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
        {tickets.map((ticket) => (
          <ListItem button key={`list-${ticket.id}`}>
            <ListItemText primary={`${ticket.name}`} />
          </ListItem>
        ))}
      </List>
    </>
  )
}

export default PageComponent
