import AppointmentItem from '../components/appointments/AppointmentItem'
import { dbCollections } from '../firebase'
import { useCollection } from '../hooks/useCollection'
import { Appointment, CreateAppointmentDtoCV } from '../types/appointments'

const Appointments = () => {
  const { collection, status } = useCollection<CreateAppointmentDtoCV, Appointment>(dbCollections.appointments)

  if (status === 'loading') {
    return <p>Loading...</p>
  }

  return (
    <div>
      <section className='flex flex-col gap-4 p-4'>
        {
          collection.map(appointment => (
            <AppointmentItem key={appointment.NO_ID_FIELD} appointment={appointment} />          
          ))
        }
      </section>
    </div>
  )
}

export default Appointments