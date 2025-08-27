'use client'
import '@/styles/globals.css'
import { ApolloProvider } from "@apollo/client/react"
import ClientContextProvider from '@/stores/graphqlClient'
import { useClientContext } from '@/hooks/useClientContext'
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
        {client && <ClientContextProvider data={client}>
          <ApolloProvider client={client}>
            {children}
          </ApolloProvider>
        </ClientContextProvider>}
      </body>
    </html>
  );
}
