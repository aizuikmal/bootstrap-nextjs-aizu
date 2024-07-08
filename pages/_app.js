import { SessionProvider, getSession } from 'next-auth/react'
//import '../styles/globals.css'
import '@/styles/globals.css'
import App from 'next/app'
import Context from '@/Context'

function MyApp ({ Component, something, pageProps: { session, ...pageProps } }) {

  const contextValues = { something }
  
  return (
    <SessionProvider session={session}>
      <Context.Provider value={contextValues}>
        <Component {...pageProps} />
      </Context.Provider>
    </SessionProvider>
  )
}

MyApp.getInitialProps = async (context) => {
	const ctx = await App.getInitialProps(context)

	const { req, res } = context.ctx

	const session = await getSession(context)
	const user_email = session?.user?.email || false

	if (req) {

		const non_protected_routes = ['/login', '/logout', '/forgot-password', '/register']

		if (!non_protected_routes.includes(req.url) && !session) {
			res.writeHead(302, { Location: '/login' })
			res.end()
		}

		// do something here
		// if (req.url == '/module/admin-management' || req.url == '/module/admin-management/role') {}
    
	}

	return { ...ctx, something: some_data }
}

export default MyApp
