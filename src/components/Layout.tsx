import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useSigninCheck } from 'reactfire'
import { routes } from '../routes/routes'

const Layout = () => {
  const {status, data} = useSigninCheck()
  const router = useNavigate()

  if (status === 'loading') {
    return null
  }

  if (!data.signedIn) {
    router('/login', {replace: true})
  }

  return (
    <div className='min-h-screen bg-gray-100'>
      <header className='w-full p-2 shadow-md bg-blue-600'>
        <nav>
          <ul className='flex flex-col justify-center items-center text-white font-semibold uppercase md:flex-row md:text-sm md:gap-2'>
            {
              routes.map(({name, to}) => (
                <li key={name} className="text-center w-full md:w-auto hover:bg-blue-700 duration-300">
                  <NavLink 
                    to={to} 
                    className={({isActive}) => isActive ? 'bg-blue-700 block w-full p-2 md:w-40 shadow-blue-500 shadow-sm':'block w-full p-2 md:w-40'}
                  >
                    {name}
                  </NavLink>
                </li>
              ))
            }
          </ul>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout