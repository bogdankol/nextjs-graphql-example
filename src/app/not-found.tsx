import Link from 'next/link'
import React from 'react'

export default function ErrorPage() {
  return (
    <div>There is no such page. 

      <Link href='/' >Return to main page</Link>
    </div>
  )
}