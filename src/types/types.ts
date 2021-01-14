export const EnumLayout = {
  default: '',
  main: 'main',
} as const

export type TypeLayout = typeof EnumLayout[keyof typeof EnumLayout]

export type BasePageProps = {
  title: string
  layout: TypeLayout
}

export type WithBaseProps<T> = T & BasePageProps

export type RoomData = {
  name: string
  password: string | null
  createdAt: string
}

export type TicketData = {
  id: string
  roomId: string
  title: string
  description: string
  url: string
  doneAt: string | null
}
