import { auth } from '@/server/auth'
import { console } from 'inspector'
import React from 'react'

export default async function UserButton() {
  const session = await auth()
  return (
    <>
      
        {session?.user.email}
     
    </>
  )
}
