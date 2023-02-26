import { useFirestoreDocData } from 'reactfire'
import { formatDate } from '../../helpers'
import { Appointment } from "../../types/appointments"
import { specialties } from "../doctors/specialties"

interface Props {
  appointment: Appointment
}

const AppointmentItem = ({ appointment }: Props) => {
  const {specialty, date, description, patient: patientRef, doctor: doctorRef} = appointment
  const {data: patient, status: statusPat} = useFirestoreDocData(patientRef)
  const {data: doctor, status: statusDoc} = useFirestoreDocData(doctorRef)
  const formattedSpecialty = specialties.find(item => item.value === specialty)

  if (statusDoc === 'loading' || statusPat === 'loading') {
    return <p>Loading...</p>
  }
  
  return (
    <div className="w-full bg-white shadow-md rounded-md py-2 px-4 max-w-2xl mx-auto">
      <p><span className="font-bold text-gray-900 uppercase text-sm">Fecha: </span>{formatDate(date)}</p>
      <p><span className="font-bold text-gray-900 uppercase text-sm">Descripción: </span>{description}</p>
      <p><span className="font-bold text-gray-900 uppercase text-sm">Especialidad: </span>{formattedSpecialty?.text ?? specialty}</p>
      <div className='border-2 rounded-md pl-2 mb-2'>
        <p><span className="font-bold text-gray-900 uppercase text-sm">Paciente</span></p>
        <div className='pl-4'>
          <p><span className="font-bold text-gray-900 uppercase text-sm">Cédula: </span>{patient?.identification}</p>
          <p><span className="font-bold text-gray-900 uppercase text-sm">Nombre: </span>{patient?.name}</p>
          <p><span className="font-bold text-gray-900 uppercase text-sm">Edad: </span>{patient?.age}</p>
          <p><span className="font-bold text-gray-900 uppercase text-sm">Email: </span>{patient?.email}</p>
        </div>
      </div>
      <div className='border-2 rounded-md pl-2'>
        <p><span className="font-bold text-gray-900 uppercase text-sm">Doctor(a)</span></p>
        <div className='pl-4'>
          <p><span className="font-bold text-gray-900 uppercase text-sm">Cédula: </span>{doctor?.identification}</p>
          <p><span className="font-bold text-gray-900 uppercase text-sm">Nombre: </span>{doctor?.name}</p>
          <p><span className="font-bold text-gray-900 uppercase text-sm">Edad: </span>{doctor?.age}</p>
          <p><span className="font-bold text-gray-900 uppercase text-sm">Email: </span>{doctor?.email}</p>
        </div>
      </div>      
    </div>
  )
}

export default AppointmentItem