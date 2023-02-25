import { CreateDoctorDto, CreateDoctorDtoCV, Doctor } from '../../types/doctors'
import { newDoctorSchema } from '../../schemas'
import { specialties } from './specialties'
import Spinner from '../Spinner'
import { useCollection } from '../../hooks/useCollection'
import { useState } from 'react'
import {Formik, Form, Field, FormikHelpers} from 'formik'
import Alert from '../Alert'

const NewDoctorForm = () => {
  const [loading, setLoading] = useState(false)
  const { addDocument } = useCollection<CreateDoctorDtoCV, Doctor>('doctors')

  const handleSubmit = async (values: CreateDoctorDto, { resetForm }: FormikHelpers<CreateDoctorDto>) => {
    try {
      setLoading(true)
      const doctorValues: CreateDoctorDtoCV =  {
        ...values,
        age: Number(values.age)
      }
      await addDocument(doctorValues)      
      setLoading(false)
      resetForm()
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='bg-white rounded-md shadow-md p-2 lg:p-4 lg:pb-6'>
      <Formik
        initialValues={{
          identification: "",
          name: "",
          email: "",
          age: "",
          specialty: specialties[0].value ?? ""
        }}
        onSubmit={handleSubmit}
        validationSchema={newDoctorSchema}
      >
        {({errors, touched, values}) => (
          <Form>
            <div className='mb-4'>
              <h2 className='text-center font-black text-xl uppercase mb-4'>Datos del Doctor</h2>
              <div className='space-y-4'>
                <label htmlFor="identification" className='block'>
                  <p className='text-gray-900 font-bold uppercase mb-1'>Cédula</p>
                  <Field
                    type="number"
                    min={0}                    
                    className='w-full p-2 border-2 border-gray-700 rounded-md'
                    placeholder='Cédula de identidad'
                    value={values.identification}
                    name="identification"
                    id='identification'
                  />
                  {errors.identification && touched.identification && <Alert type='error'>{errors.identification}</Alert>}
                </label>
                <label htmlFor="name" className='block'>
                  <p className='text-gray-900 font-bold uppercase mb-1'>Nombre</p>
                  <Field
                    type="text"
                    className='w-full p-2 border-2 border-gray-700 rounded-md'
                    placeholder='Nombre del Doctor'
                    value={values.name}
                    name="name"
                    id='name'
                  />
                  {errors.name && touched.name && <Alert type='error'>{errors.name}</Alert>}
                </label>
                <label htmlFor="age" className='block'>
                  <p className='text-gray-900 font-bold uppercase mb-1'>Edad</p>
                  <Field
                    type="number"
                    min={0}
                    className='w-full p-2 border-2 border-gray-700 rounded-md'
                    placeholder='Edad del Doctor'
                    value={values.age}
                    name="age"
                    id='age'
                  />
                  {errors.age && touched.age && <Alert type='error'>{errors.age}</Alert>}
                </label>
                <label htmlFor="email" className='block'>
                  <p className='text-gray-900 font-bold uppercase mb-1'>Correo electrónico</p>
                  <Field
                    type="email"
                    className='w-full p-2 border-2 border-gray-700 rounded-md'
                    placeholder='Email del Doctor'
                    value={values.email}
                    name="email"
                    id='email'
                  />
                  {errors.email && touched.email && <Alert type='error'>{errors.email}</Alert>}
                </label>
                <label htmlFor="specialty" className='block'>
                  <p className='text-gray-900 font-bold uppercase mb-1'>Especialidad</p>
                  <Field
                    as="select"
                    className='w-full p-2 border-2 border-gray-700 rounded-md'
                    name="specialty"
                    id='specialty'                                        
                  >
                    {
                      specialties.map((specialty) => (
                        <option key={specialty.value} value={specialty.value}>{specialty.text}</option>
                      ))
                    }
                  </Field>
                  {errors.specialty && touched.specialty && <Alert type='error'>{errors.specialty}</Alert>}
                </label>          
              </div>
              {
                loading ? (
                  <div
                    className='bg-blue-600 w-full p-2 block mt-4 uppercase font-bold text-white hover:bg-blue-700 cursor-pointer duration-200'
                  >
                    <Spinner />
                  </div>
                ) : (
                  <input
                    type="submit"
                    value="Registrar Doctor"
                    className='bg-blue-600 w-full p-2 block mt-4 uppercase font-bold text-white hover:bg-blue-700 cursor-pointer duration-200'
                  />
                )
              }
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default NewDoctorForm