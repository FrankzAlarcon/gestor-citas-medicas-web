import {Formik, Form, Field} from 'formik'
import { ChangeEvent, useEffect, useMemo, useState } from 'react'
import { dbCollections } from '../../firebase'
import { useCollection } from '../../hooks/useCollection'
import { newAppointmentSchema, newPatientSchema } from '../../schemas'
import { CreateDoctorDtoCV, Doctor } from '../../types/doctors'
import { CreatePatientDtoCV, Patient } from '../../types/patient'
import Alert from '../Alert'
import { specialties } from '../doctors/specialties'

const NewAppointmentForm = () => {
  const { collection } = useCollection<CreateDoctorDtoCV, Doctor>(dbCollections.doctors)
  const { collection: patientsCol } = useCollection<CreatePatientDtoCV, Patient>(dbCollections.patients)
  const [existPatient, setExistPatient] = useState(true)
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [specialtyValue, setSpecialtyValue] = useState(specialties[0].value)
  const [doctorName, setDoctorName] = useState('')
  const [doctorIdentification, setDoctorIdentification] = useState('')
  const [selectedDoctorId, setSelectedDoctorId] = useState('')
  const [patientIdentification, setPatientIdentification] = useState('')
  const [patientName, setPatientName] = useState('')

  const filteredDoctors = useMemo(() => doctors.filter(doctor => doctor.specialty === specialtyValue), [doctors, specialtyValue])

  useEffect(() => {
    setDoctors(collection)
  }, [collection])

  const handleSelectSpecialties = ({ target }: ChangeEvent<HTMLSelectElement>) => {
    setSpecialtyValue(target.value)
  }

  const handleSelectDoctors = ({ target }: ChangeEvent<HTMLSelectElement>) => {
    const selectedDoctor = filteredDoctors.find(doctor => doctor.NO_ID_FIELD === target.value)
    console.log(selectedDoctor)
    if (!selectedDoctor)  {
      return
    }
    setSelectedDoctorId(target.value)
    setDoctorName(selectedDoctor.name)
    setDoctorIdentification(selectedDoctor.identification)
  }

  const handleSearchPatient = () => {
    const searchedPatient = patientsCol.find(patient => patient.identification === patientIdentification)
    if (!searchedPatient) {
      setPatientName('')
      setExistPatient(false)
      return
    }
    setPatientName(searchedPatient.name)
    setExistPatient(true)
  }

  return (
    <div className='bg-white rounded-md shadow-md p-2 lg:p-4 lg:pb-6'>
      <Formik
        initialValues={{
          date: "",
          specialty: "",
          description: "",
          doctorIdentification: doctorIdentification ?? "",
          doctorName: doctorName ?? "",
          patientIdentification: patientIdentification ?? "",
          patientName: patientName ?? "",
        }}
        onSubmit={() => {}}
        validationSchema={newAppointmentSchema}
        enableReinitialize
      >
        {({errors, touched, values}) => (
          <Form>
            <div className='mb-4'>
              <h2 className='text-center font-black text-xl uppercase mb-4'>Datos de la Cita</h2>
              <div className='space-y-4'>
                <label htmlFor="date" className='block'>
                  <p className='text-gray-900 font-bold uppercase mb-1'>Fecha</p>
                  <Field
                    type="datetime-local"
                    className='w-full p-2 border-2 border-gray-700 rounded-md'
                    value={values.date}
                    name="date"
                    id='date'
                  />
                  {errors.date && touched.date && <Alert type='error'>{errors.date}</Alert>}
                </label>
                <label htmlFor="description" className='block'>
                  <p className='text-gray-900 font-bold uppercase mb-1'>Descripción</p>
                  <Field
                    type="text"
                    className='w-full p-2 border-2 border-gray-700 rounded-md'
                    placeholder='Ingrese la descripción de la cita'
                    value={values.description}
                    name="description"
                    id='description'
                  />
                  {errors.description && touched.description && <Alert type='error'>{errors.description}</Alert>}
                </label>
                <label htmlFor="specialty" className='block'>
                  <p className='text-gray-900 font-bold uppercase mb-1'>Especialidad</p>
                  <Field
                    as="select"
                    className='w-full p-2 border-2 border-gray-700 rounded-md'
                    name="specialty"
                    id='specialty'
                    value={specialtyValue}
                    onChange={handleSelectSpecialties}
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
              <div className='my-4'>
                <h2 className='text-center font-black text-xl uppercase mb-4'>Datos del Paciente</h2>
                <div className='space-y-4'>
                  <label htmlFor="patientIdentification" className='block'>
                    <p className='text-gray-900 font-bold uppercase mb-1'>Cédula</p>
                    <div className='flex gap-1'>
                      <Field                  
                        className='w-full p-2 border-2 border-gray-700 rounded-md'
                        placeholder='Cédula de identidad del Paciente'
                        value={values.patientIdentification}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setPatientIdentification(e.target.value)}
                        name="patientIdentification"
                        id='patientIdentification'
                      />
                      <button 
                        type='button'
                        className='w-24 bg-blue-600 rounded-md uppercase font-bold text-white text-sm'
                        onClick={handleSearchPatient}
                      >Buscar</button>
                    </div>
                    {!existPatient && <Alert type='error'>El paciente no existe</Alert>}
                    {errors.patientIdentification && touched.patientIdentification && <Alert type='error'>{errors.patientIdentification}</Alert>}
                  </label>
                  <label htmlFor="patientName" className='block'>
                    <p className='text-gray-900 font-bold uppercase mb-1'>Nombre</p>
                    <Field
                      type="text"
                      className='w-full p-2 border-2 border-gray-700 rounded-md'
                      placeholder='Nombre del paciente'
                      value={values.patientName}
                      name="patientName"
                      id='patientName'
                      disabled
                    />
                    {errors.patientName && touched.patientName && <Alert type='error'>{errors.patientName}</Alert>}
                  </label>
                </div>
              </div>
              <div className='my-4'>
                <h2 className='text-center font-black text-xl uppercase mb-4'>Datos del Doctor</h2>
                <div className='space-y-4'>
                  <label htmlFor="doctors" className='block'>
                    <p className='text-gray-900 font-bold uppercase'>Doctores</p>                    
                    <p className='mb-1 text-sm'>Los Doctores se muestran segun la especialidad</p>
                    <Field
                      as="select"                      
                      className='w-full p-2 border-2 border-gray-700 rounded-md'
                      name="doctors"                      
                      id='doctors'
                      value={selectedDoctorId}
                      onChange={handleSelectDoctors}
                    >
                      <option value="" disabled>-- Seleccionar Doctor --</option>
                      {
                        filteredDoctors.map((doctor) => (
                          <option key={doctor.NO_ID_FIELD} value={doctor.NO_ID_FIELD}>{doctor.name}</option>
                        ))
                      }
                    </Field>
                    {/* {errors.specialty && touched.specialty && <Alert type='error'>{errors.specialty}</Alert>} */}
                  </label>  
                  <label htmlFor="doctorIdentification" className='block'>
                    <p className='text-gray-900 font-bold uppercase mb-1'>Cédula</p>
                    <Field
                      type="text"                   
                      className='w-full p-2 border-2 border-gray-700 rounded-md'
                      placeholder='Cédula de identidad del Doctor'
                      value={values.doctorIdentification}
                      name="doctorIdentification"
                      id='doctorIdentification'
                      disabled
                    />
                    {errors.doctorIdentification && touched.doctorIdentification && <Alert type='error'>{errors.doctorIdentification}</Alert>}
                  </label>
                  <label htmlFor="doctorName" className='block'>
                    <p className='text-gray-900 font-bold uppercase mb-1'>Nombre</p>
                    <Field
                      type="text"
                      className='w-full p-2 border-2 border-gray-700 rounded-md'
                      placeholder='Nombre del Doctor'
                      value={values.doctorName}
                      name="doctorName"
                      id='doctorName'
                      disabled
                    />
                    {errors.doctorName && touched.doctorName && <Alert type='error'>{errors.doctorName}</Alert>}
                  </label>
                </div>
              </div>
              <input
                type="submit"
                value="Registrar Doctor"
                className='bg-blue-600 w-full p-2 block mt-4 uppercase font-bold text-white hover:bg-blue-700 cursor-pointer duration-200'
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default NewAppointmentForm