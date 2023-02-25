import { useNavigate } from 'react-router-dom'
import { useSigninCheck } from 'reactfire'
import LoginForm from '../components/login/LoginForm'

const Login = () => {
  const {status, data} = useSigninCheck()
  const router = useNavigate()

  if (status === 'loading') {
    return null
  }

  if (data.signedIn) {
    router('/', { replace: true })
  }
  return (
    <div className='bg-gray-100'>
      <div className='container p-4 text-center absolute mx-auto my-auto top-0 left-0 right-0 bottom-0'>
        <h1 className='text-4xl mt-10 font-black text-blue-600 md:text-5xl lg:text-6xl'>Sistema de Gestión de <span className='text-black'>Citas</span></h1>
        <p className='mt-4 mb-10'>Ingresa tu usuario y <span className='text-blue-600 font-bold'>contraseña</span></p>
        <LoginForm />
      </div>
    </div>
  )
}

export default Login