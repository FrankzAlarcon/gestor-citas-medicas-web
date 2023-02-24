import NewAppointmentForm from '../components/appointments/NewAppointmentForm'
import TitleSection from '../components/TitleSection'

const NewAppointment = () => {
  return (
    <div>
      <TitleSection
        title='Registra una nueva '
        boldTitle='Cita'
        desc='Registra la citas de tu centro médico para que puedas '
        boldDesc='administrarlas'
      />
      <div className='px-2 pb-4 md:max-w-2xl md:mx-auto'>
        <NewAppointmentForm />
      </div>
    </div>
  )
}

export default NewAppointment