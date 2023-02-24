import { Patient } from "../../types/patient"

interface Props {
  patient: Patient
}
const PatientItem = ({ patient }: Props) => {
  const {age, email, identification, name} = patient
  return (
    <div className="w-full bg-white shadow-md rounded-md py-2 px-4 max-w-2xl mx-auto">
      <p><span className="font-bold text-gray-900 uppercase text-sm">Cédula: </span>{identification}</p>
      <p><span className="font-bold text-gray-900 uppercase text-sm">Paciente: </span>{name}</p>
      <p><span className="font-bold text-gray-900 uppercase text-sm">Edad: </span>{age}</p>
      <p><span className="font-bold text-gray-900 uppercase text-sm">Email: </span>{email}</p>
    </div>
  )
}

export default PatientItem