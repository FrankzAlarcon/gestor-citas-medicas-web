import React from 'react'
import NewDoctorForm from '../components/doctors/NewDoctorForm'
import TitleSection from '../components/TitleSection'

const NewDoctor = () => {
  return (
    <div>
      <TitleSection 
        title='Registra un nuevo '
        boldTitle='Doctor'
        desc='Añade los doctores para que puedas '
        boldDesc='administrarlos'
      />
      <div className='px-2 pb-4 md:max-w-2xl md:mx-auto'>
        <NewDoctorForm />
      </div>
    </div>
  )
}

export default NewDoctor