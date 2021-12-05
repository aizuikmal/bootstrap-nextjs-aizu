import Head from 'next/head'
import { useSession } from 'next-auth/react'
import Login from '@/components/Login'
import Dashboard from '@/components/Dashboard'

export default function Home() {
  const { data: session } = useSession()
  return (
    <div>
      <Head>
        <title>Title</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div>
        {
        session
          ? <Dashboard />
          : <Login />
        }
      </div>
    </div>
  )
}
