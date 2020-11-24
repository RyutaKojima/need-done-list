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
