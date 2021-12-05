import { useEffect, Fragment, useState } from 'react'

import { useSession, signOut } from 'next-auth/react'
import { signIn } from 'next-auth/react'

import { Dialog, Menu, Transition } from '@headlessui/react'
import { FcGoogle } from 'react-icons/fc'
import { FiBell, FiCalendar, FiBarChart, FiFolder, FiHome, FiInbox, FiMenu, FiDatabase, FiX, FiUsers, FiSearch } from 'react-icons/fi'

export default function Layout({ children }) {
  const { data: session } = useSession()

  const [sidebarOpen, setSidebarOpen] = useState(true)

  useEffect(() => {
    console.log(session)
  }, [])

  return (
    <div className='h-screen flex overflow-hidden bg-gray-100'>

      <SidebarMobilePops sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className='hidden md:flex md:flex-shrink-0'>
        <div className='flex flex-col w-64'>
          <SidebarMenus />
        </div>
      </div>

      <div className='flex flex-col w-0 flex-1 overflow-hidden'>
        <div className='relative z-10 flex-shrink-0 flex h-16 bg-white shadow'>
          <button onClick={() => setSidebarOpen(true)} type='button' className='px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden'>
            <FiMenu className='h-6 w-6' aria-hidden='true' />
          </button>
          <div className='flex-1 px-4 flex justify-between'>
            <div className='flex-1 flex items-center'>
              <SearchForm />
            </div>
            <div className='ml-4 flex items-center md:ml-6'>
              <button type='button' className='bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
                <FiBell className='h-6 w-6' aria-hidden='true' />
              </button>
              <ProfileDropdown session={session} />
            </div>
          </div>
        </div>

        <main className='flex-1 relative overflow-y-auto focus:outline-none'>
          {children}
        </main>
      </div>
    </div>
  )
}

function ProfileDropdown({ session }) {

  const userNavigation = [
    { name: 'Your Profile', href: '#' },
    { name: 'Settings', href: '#' }
  ]

  return (
    <Menu as='div' className='ml-3 relative'>
      <div>
        {
          session
            ? <Menu.Button className='max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
              <img className='h-8 w-8 rounded-full' src={session?.user?.image ? session.user.image : ''} alt='' referrerpolicy='no-referrer' />
            </Menu.Button>
            :
            <a onClick={() => signIn('google')} className='cursor-pointer w-full inline-flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50'>
              <div className='mr-3'>Sign in with Google</div>
              <FcGoogle size='25' />
            </a>
        }
      </div>
      <Transition as={Fragment} enter='transition ease-out duration-100' enterFrom='transform opacity-0 scale-95' enterTo='transform opacity-100 scale-100' leave='transition ease-in duration-75' leaveFrom='transform opacity-100 scale-100' leaveTo='transform opacity-0 scale-95'>
        <Menu.Items className='origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'>
          {userNavigation.map((item) => (
            <Menu.Item key={item.name}>
              {({ active }) => (
                <a href={item.href} className={`${active ? 'bg-gray-100' : ''} block px-4 py-2 text-sm text-gray-700`}>
                  {item.name}
                </a>
              )}
            </Menu.Item>
          ))}
          <Menu.Item>
            <a onClick={() => signOut()} className='cursor-pointer block px-4 py-2 text-sm text-gray-700'>
              Sign Out
            </a>
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

function SidebarMobilePops({ sidebarOpen, setSidebarOpen }) {
  return (
    <Transition.Root show={sidebarOpen} as={Fragment}>
      <Dialog as='div' className='fixed inset-0 flex z-40 md:hidden' onClose={setSidebarOpen}>
        <Transition.Child as={Fragment} enter='transition-opacity ease-linear duration-300' enterFrom='opacity-0' enterTo='opacity-100' leave='transition-opacity ease-linear duration-300' leaveFrom='opacity-100' leaveTo='opacity-0'>
          <Dialog.Overlay className='fixed inset-0 bg-gray-600 bg-opacity-75' />
        </Transition.Child>
        <Transition.Child as={Fragment} enter='transition ease-in-out duration-300 transform' enterFrom='-translate-x-full' enterTo='translate-x-0' leave='transition ease-in-out duration-300 transform' leaveFrom='translate-x-0' leaveTo='-translate-x-full'>
          <div className='relative flex-1 flex flex-col max-w-xs w-full pb-4 bg-gray-800'>
            <Transition.Child as={Fragment} enter='ease-in-out duration-300' enterFrom='opacity-0' enterTo='opacity-100' leave='ease-in-out duration-300' leaveFrom='opacity-100' leaveTo='opacity-0'>
              <div className='absolute top-0 right-0 -mr-12 pt-2'>
                <button type='button' onClick={() => setSidebarOpen(false)} className='ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>
                  <FiX className='h-6 w-6 text-white' aria-hidden='true' />
                </button>
              </div>
            </Transition.Child>
            <SidebarMenus />
          </div>
        </Transition.Child>
        <div className='flex-shrink-0 w-14' aria-hidden='true'>
          {/* Dummy element to force sidebar to shrink to fit close icon */}
        </div>
      </Dialog>
    </Transition.Root>
  )
}

function SidebarMenus() {

  const navigation = [
    { name: 'Dashboard', href: '#', icon: FiHome, current: true },
    { name: 'Team', href: '#', icon: FiUsers, current: false },
    { name: 'Projects', href: '#', icon: FiFolder, current: false },
    { name: 'Calendar', href: '#', icon: FiCalendar, current: false },
    { name: 'Documents', href: '#', icon: FiInbox, current: false },
    { name: 'Reports', href: '#', icon: FiBarChart, current: false }
  ]

  return (
    <div className='flex-1 flex flex-col min-h-0'>
      <div className='flex items-center h-16 flex-shrink-0 px-4 bg-gray-900 text-white'>
        <FiDatabase size='25' />
        <div className='ml-3 text-xl'>Database</div>
      </div>
      <div className='flex-1 flex flex-col overflow-y-auto'>
        <nav className='flex-1 px-2 py-4 bg-gray-800 space-y-1'>
          {navigation.map((item) => (
            <a key={item.name} href={item.href} className={`${item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'} group flex items-center px-2 py-2 text-sm font-medium rounded-md`}>
              <item.icon className={`${item.current ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-300'} mr-3 flex-shrink-0 h-6 w-6`} aria-hidden='true' />
              {item.name}
            </a>
          ))}
        </nav>
      </div>
    </div>
  )
}

function SearchForm() {
  return (
    <form className='w-full flex md:ml-0' action='#' method='GET'>
      <div className='relative w-full text-gray-400 focus-within:text-gray-600'>
        <div className='absolute inset-y-0 left-0 flex items-center pointer-events-none'>
          <FiSearch className='h-5 w-5' aria-hidden='true' />
        </div>
        <input id='search-field' placeholder='Search' type='search' name='search' className='block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm' />
      </div>
    </form>
  )
}