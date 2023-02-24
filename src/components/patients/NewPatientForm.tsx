import { collection, addDoc } from 'firebase/firestore'
import { useFirestore } from 'reactfire'
import { Formik, Form, Field, FormikHelpers } from 'formik'
import { useEffect, useState } from 'react'
import { newPatientSchema } from '../../schemas'
import { CreatePatientDto, CreatePatientDtoCV, Patient } from '../../types/patient'
import Alert from '../Alert'
import Spinner from '../Spinner'
import { useCollection } from '../../hooks/useCollection'

const NewPatientForm = () => {
  const [loading, setLoading] = useState(false)
  const { addDocument } = useCollection<CreatePatientDtoCV, Patient>('patients')

  const handleSubmit = async (values: CreatePatientDto, { resetForm }: FormikHelpers<CreatePatientDto>) => {
    try {
      setLoading(true)
      const patientData = {
        ...values,
        age: Number(values.age)
      }
      await addDocument(patientData)
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
          age: ""
        }}
        onSubmit={handleSubmit}
        validationSchema={newPatientSchema}
      >
        {({errors, touched, values}) => (
          <Form>
            <div className='mb-4'>
              <h2 className='text-center font-black text-xl uppercase mb-4'>Datos del Paciente</h2>
              <div className='space-y-4'>
                <label htmlFor="identification" className='block'>
                  <p className='text-gray-900 font-bold uppercase mb-1'>Cédula</p>
                  <Field
                    type="text"
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
                    placeholder='Nombre del paciente'
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
                    placeholder='Edad del paciente'
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
                    placeholder='Email del paciente'
                    value={values.email}
                    name="email"
                    id='email'
                  />
                  {errors.email && touched.email && <Alert type='error'>{errors.email}</Alert>}
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
                    value="Registrar Paciente"
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

export default NewPatientForm