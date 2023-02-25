import * as yup from 'yup'

const identification = yup.string().length(10, 'La cédula debe tener 10 dígitos').required('La cédula es requerida');
const name = yup.string().min(3, 'Nombre demasiado corto').required('El nombre es requerido');
const age = yup.string().min(0, 'La edad debe ser mayor a cero').required('La edad es requerida')
const email = yup.string().email('Ingrese un email válido').required('El email es requerido');
const password = yup.string().min(8, 'Se necesitan mínimo 8 caracteres').required('La contraseña es requerida');
const date = yup.date().required('La fecha es requerida');
const specialty = yup.string().min(3).required('La especialidad es requerida');
const description = yup.string().min(5).required('La descripción es requerida')


export const newPatientSchema = yup.object().shape({
  identification,
  name,
  email,
  age
})

export const newDoctorSchema = yup.object().shape({
  identification,
  name,
  age,
  specialty,
  email
})

export const newAppointmentSchema = yup.object().shape({
  date,
  specialty,
  description,  
})

export const loginSchema = yup.object().shape({
  email,
  password
});