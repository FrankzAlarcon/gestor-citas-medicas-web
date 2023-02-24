import DoctorItem from "../components/doctors/DoctorItem"
import TitleSection from "../components/TitleSection"
import { dbCollections } from "../firebase"
import { useCollection } from "../hooks/useCollection"
import { CreateDoctorDtoCV, Doctor } from "../types/doctors"

const Doctors = () => {  
  const {status, collection} = useCollection<CreateDoctorDtoCV, Doctor>(dbCollections.doctors)
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
          collection.map(doctor => (
            <DoctorItem key={doctor.NO_ID_FIELD} doctor={doctor}/>
          ))
        }
      </section>
    </div>
  )
}

export default Doctors