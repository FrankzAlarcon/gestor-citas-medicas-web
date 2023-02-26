import { getAuth, signOut } from 'firebase/auth'
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useSigninCheck } from 'reactfire'
import { routes } from '../routes/routes'

const Layout = () => {
  const auth = getAuth()
  const {status, data} = useSigninCheck()
  const router = useNavigate()

  if (status === 'loading') {
    return null
  }

  if (!data.signedIn) {
    router('/login', {replace: true})
  }

  const handleCloseSesion = async () => {
    await signOut(auth)
    router('/login')
  }

  return (
    <div className='min-h-screen bg-gray-100'>
      <header className='w-full p-2 shadow-md bg-blue-600'>
        <nav className='flex flex-col md:flex-row'>
          <ul className='w-full flex flex-col justify-center items-center text-white font-semibold uppercase md:flex-row md:text-sm md:gap-2'>
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
          <button
            type='button'
            className='block w-full p-2 md:w-40 text-center hover:bg-blue-700 duration-300 text-white uppercase font-semibold'
            onClick={handleCloseSesion}
          >Cerrar Sesión</button>
        </nav>        
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout