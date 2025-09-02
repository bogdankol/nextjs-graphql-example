'use client'
import '@/styles/globals.css'
import { ApolloProvider } from "@apollo/client/react"
import initApolloClient from '@/utils/initApolloClient'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const client = initApolloClient()

  return (
    <html lang="en">
      <body className='bg-rose-300 min-h-screen'>
        <ApolloProvider client={client}>
          {children}
        </ApolloProvider>
      </body>
    </html>
  );
}
