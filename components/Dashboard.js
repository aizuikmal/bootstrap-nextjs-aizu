import { useEffect } from 'react'

import { useSession, signOut } from 'next-auth/react'

import Layout from '@/components/Layout'

export default function Dashboard () {
  const { data: session } = useSession()

  useEffect(() => {
    // console.log(session)
  }, [])

  return (
    <Layout>
      <div className='py-6'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 md:px-8'>
          <h1 className='text-2xl font-semibold text-gray-900'>Dashboard</h1>
        </div>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 md:px-8'>
        
          {/* Replace with your content */}

          {
            session &&
              <>
                Signed in as {session.user.email}
                <a onClick={() => signOut()} className='cursor-pointer block py-2 text-sm text-gray-700'>
                  Sign Out
                </a>
              </>
          }
          <div className='py-4'>
            <div className='border-4 border-dashed border-gray-200 rounded-lg h-96' />
          </div>
          
        </div>
      </div>
    </Layout>
  )
}
