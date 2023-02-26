import {Formik, Form, Field, FormikHelpers} from 'formik'
import { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { loginSchema } from '../../schemas'
import Alert from '../Alert'
import Spinner from '../Spinner'
import { Login } from '../../types/login'
import { useAuth } from 'reactfire'
import { useNavigate } from 'react-router-dom'

const LoginForm = () => {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const auth = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (values: Login, { resetForm }: FormikHelpers<Login>) => {
    try {
      setLoading(true)
      const { email, password } = values
      const user = await signInWithEmailAndPassword(auth, email, password)
      if (!user) {
        return
      }
      navigate('/')
      resetForm()
    } catch (error) {
      setMessage('Credenciales incorrecta')
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="p-2 lg:py-5 lg:px-3 bg-white shadow-md w-full md:w-3/4 mx-auto lg:w-1/2">
      <Formik
        initialValues={{email: '', password: ''}}   
        validationSchema={loginSchema}
        onSubmit={handleSubmit}        
      >
        {({errors, values, touched}) => (
          <>
            {message && <Alert type="error">{message}</Alert>}
            <Form className="w-full" >
              <label htmlFor="email">
                <Field
                  className='w-full rounded-md border border-gray-900 p-3 mt-4'
                  type='email'
                  name='email'
                  id='email'
                  value={values.email}
                  placeholder='Email'
                />
                {touched.email && errors.email && <Alert type="error">{errors.email}</Alert>}
              </label>
              <label htmlFor="password">
                <Field 
                  className='w-full rounded-md border border-gray-900 p-3 mt-4'
                  placeholder='Contraseña'
                  type='password'
                  id='password'
                  value={values.password}
                  name='password'                
                />
                {touched.password && errors.password && <Alert type="error">{errors.password}</Alert>}
              </label>
              {
                !loading ? (<input
                  className="bg-blue-600 w-full p-2 my-3 font-bold uppercase text-white cursor-pointer hover:bg-blue-700 transition-colors"
                  type="submit"              
                  value="Iniciar Sesión"
                />) : (
                  <div className="bg-blue-600 w-full pt-4 pb-2 my-3 font-bold uppercase text-white cursor-pointer hover:bg-blue-700 transition-colors">
                    <Spinner />
                  </div>
                )
              }
              
            </Form>
          </>
        )}
      </Formik>      
    </div>
  )
}

export default LoginForm