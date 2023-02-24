import { Doctor } from "../../types/doctors"
import { specialties } from "./specialties"

interface Props {
  doctor: Doctor
}

const DoctorItem = ({ doctor }: Props) => {
  const {age, email, identification, name, specialty} = doctor
  const formattedSpecialty = specialties.find(item => item.value === specialty)
  return (
    <div className="w-full bg-white shadow-md rounded-md py-2 px-4 max-w-2xl mx-auto">
      <p><span className="font-bold text-gray-900 uppercase text-sm">Cédula: </span>{identification}</p>
      <p><span className="font-bold text-gray-900 uppercase text-sm">Paciente: </span>{name}</p>
      <p><span className="font-bold text-gray-900 uppercase text-sm">Edad: </span>{age}</p>
      <p><span className="font-bold text-gray-900 uppercase text-sm">Especialidad: </span>{formattedSpecialty?.text ?? specialty}</p>
      <p><span className="font-bold text-gray-900 uppercase text-sm">Email: </span>{email}</p>
  </div>
  )
}

export default DoctorItem