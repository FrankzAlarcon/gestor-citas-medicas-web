import PatientItem from '../components/patients/PatientItem'
import TitleSection from '../components/TitleSection'
import { useCollection } from '../hooks/useCollection'
import { CreatePatientDtoCV, Patient } from '../types/patient'

const Patients = () => {
  const {status, collection} = useCollection<CreatePatientDtoCV, Patient>('patients')
  if (status === 'loading') {
    return <p>Loading...</p>
  }
  return (
    <div>
      <TitleSection
        title='Listado de '
        boldTitle='Pacientes'
        desc='Observa los pacientes registrados en el '
        boldDesc='sistema'
      />
      <section className='flex flex-col gap-4 p-4'>
        {
          collection.map(patient => (
            <PatientItem key={patient.NO_ID_FIELD} patient={patient}/>
          ))
        }
      </section>
    </div>
  )
}

export default Patients