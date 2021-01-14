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
  ListItemSecondaryAction,
  ListItemText,
  Tab,
  Tabs,
  Toolbar,
} from '@material-ui/core'
import { firestore } from '../../library/firebase'
import { useInitialize } from '../../hooks/useInitialize'
import CreateTicketDialog from '../../components/tickets/CreateTicketDialog'
import EditTicketDialog from '../../components/tickets/EditTicketDialog'

type PageProps = WithBaseProps<{}>

// noinspection JSUnusedGlobalSymbols
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
  const [tickets, setTickets] = useState<TicketData[]>([])

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
      .where('roomId', '==', roomCode)
      .where('doneAt', '==', null)
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
            })
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

  const handleAddTicket = (value: {
    title: string
    description: string
    url: string
  }) => {
    const newTicket: TicketData = {
      id: '',
      roomId: roomCode,
      title: value.title,
      description: value.description,
      url: value.url,
      doneAt: null,
    }

    firestore.collection('Tickets').add(newTicket)
  }

  const handleEditTicket = (newTicket: TicketData) => {
    firestore.collection('Tickets').doc(newTicket.id).update(newTicket)
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
            <ListItemText primary={`${ticket.title}`} />
            <ListItemSecondaryAction>
              <EditTicketDialog ticket={ticket} onSubmit={handleEditTicket} />
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>

      <CreateTicketDialog onSubmit={handleAddTicket} />
    </>
  )
}

export default PageComponent
