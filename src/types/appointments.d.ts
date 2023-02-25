import { DocumentReference } from 'firebase/firestore'

export interface CreateAppointmentDto {
  date: string
  description: string
  doctorIdentification: string
  doctorName: string
  patientIdentification: string
  patientName: string
  specialty: string
}

export interface CreateAppointmentDtoCV {
  date: string
  description: string
  specialty: string
  patient: DocumentReference
  doctor: DocumentReference
}

export interface Appointment extends CreateAppointmentDtoCV {
  NO_ID_FIELD: string
}