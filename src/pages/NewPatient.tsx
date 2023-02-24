import NewPatientForm from '../components/patients/NewPatientForm'
import TitleSection from '../components/TitleSection'

const NewPatient = () => {
  return (
    <div>
      <TitleSection
        title='Registra un nuevo '
        boldTitle='Paciente'
        desc='Añade tus pacientes para que puedas '
        boldDesc='administrarlos'
      />
      <div className='px-2 pb-4 md:max-w-2xl md:mx-auto'>
        <NewPatientForm />
      </div>
    </div>
  )
}

export default NewPatient