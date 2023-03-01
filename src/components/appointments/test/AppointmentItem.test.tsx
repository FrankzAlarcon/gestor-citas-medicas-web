import { describe, test, beforeAll, afterAll, beforeEach, expect } from 'vitest';
import { MatcherFunction, render, screen } from '@testing-library/react'
import AppointmentItem from '../AppointmentItem'
import { db, dbCollections } from '../../../firebase'
import { doc, getDoc } from 'firebase/firestore';
import { Appointment } from '../../../types/appointments';
import { formatDate, login, logout } from '../../../helpers';
import { specialties } from '../../doctors/specialties';
import { Doctor } from '../../../types/doctors';
import { Patient } from '../../../types/patient';

let appointment: Appointment
let doctor: Doctor
let patient: Patient

beforeAll(async () => {
  await login()
  const appointmentDoc = await getDoc(doc(db, dbCollections.appointments, 'ghFwfaVd6goR14T44a20'))
  appointment = appointmentDoc.data() as Appointment
  const doctorDoc = await getDoc(appointment.doctor)
  const patientDoc = await getDoc(appointment.patient)

  doctor = doctorDoc.data() as Doctor
  patient = patientDoc.data() as Patient

  if (!appointment) {
    return
  }
})

afterAll(async () => {
  await logout()
})

describe('AppointmentItem', () => {
  const findTextWithinSpan = (text: string): MatcherFunction => {
    return (content: string, element: Element | null): boolean => {
      return element?.tagName.toLowerCase() === 'span' && content === text
    }
  }
  beforeEach(() => {
    render(<AppointmentItem appointment={appointment} />)
  })
  
  test('should render', () => {
    render(<AppointmentItem appointment={appointment} />)
  })

  test('should render appointment info', async () => {
    const {date, description, specialty} = appointment
    const formattedSpecialty = specialties.find(item => item.value === specialty)
    if (!formattedSpecialty) {
      return
    }

    await screen.findByText(findTextWithinSpan('Fecha:'))
    await screen.findByText(formatDate(date))

    await screen.findByText(findTextWithinSpan('Descripción:'))
    await screen.findByText(description)

    await screen.findByText(findTextWithinSpan('Especialidad:'))
    await screen.findByText(formattedSpecialty.text) 
  })

  test('should render patient info', async () => {
    const { identification, name, age, email } = patient

    await screen.findByText(findTextWithinSpan('Paciente'))
    await screen.findAllByText(findTextWithinSpan('Cédula:'))
    await screen.findByText(identification)

    await screen.findAllByText(findTextWithinSpan('Nombre:'))
    await screen.findByText(name)

    await screen.findAllByText(findTextWithinSpan('Edad:'))
    await screen.findAllByText(age)

    await screen.findAllByText(findTextWithinSpan('Email:'))    
    await screen.findByText(email)

  })

  test('should render doctor info', async () => {
    const { identification, name, age, email } = doctor

    await screen.findByText(findTextWithinSpan('Doctor(a)'))
    await screen.findAllByText(findTextWithinSpan('Cédula:'))
    await screen.findByText(identification)

    await screen.findAllByText(findTextWithinSpan('Nombre:'))
    await screen.findByText(name)

    await screen.findAllByText(findTextWithinSpan('Edad:'))
    await screen.findAllByText(age)

    await screen.findAllByText(findTextWithinSpan('Email:'))    
    await screen.findByText(email)
  })
})