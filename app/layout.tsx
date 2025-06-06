import React, { ReactNode } from 'react'
import { greatVibes, inter } from '../styles/font'

type Props = {
  children: ReactNode
}

const MainLayout = ({ children }: Props) => {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        {children}
      </body>
    </html>
  )
}

export default MainLayout