import { Link } from '@material-ui/core'
import NextLink, { LinkProps } from 'next/link'
import React from 'react'

const MyLink: React.FC<LinkProps> = ({ href, children }) => {
  return (
    <NextLink href={href}>
      <Link>{children}</Link>
    </NextLink>
  )
}

export default MyLink
