import React from 'react'

export default async function Tempalte({ 
    children,
} : {
    children: React.ReactNode
}) {
  return (
    <div className='animate-appear'>
      {children}
    </div>
  )
}
