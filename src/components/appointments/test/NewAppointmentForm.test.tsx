import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, test, vi } from "vitest";
import { FirebaseAppProvider, FirestoreProvider } from "reactfire";
import { db, firebaseConfig } from "../../../firebase";
import { login, logout } from "../../../helpers";
import NewAppointmentForm from "../NewAppointmentForm";

beforeAll(async () => {
  await login()  
})

afterAll(async () => {
  await logout()
})

describe('NewAppointmentForm', () => {

  beforeEach(() => {
    render(
      <FirebaseAppProvider firebaseConfig={firebaseConfig}>
        <FirestoreProvider sdk={db}>
          <NewAppointmentForm />
        </FirestoreProvider>
      </FirebaseAppProvider>
    )
  })

  afterEach(cleanup)

  test('should render', () => {
    render(
      <FirebaseAppProvider firebaseConfig={firebaseConfig}>
        <FirestoreProvider sdk={db}>
          <NewAppointmentForm />
        </FirestoreProvider>
      </FirebaseAppProvider>
    )
  })

  test('render the form fields', async () => {    
    const user = userEvent.setup()

    await user.type(screen.getByLabelText(/Fecha/i), '2023-02-26T15:30:00')
    await user.type(screen.getByLabelText(/Descripción/i), 'A short description')
    await user.type(screen.getByRole('combobox', {name: 'Especialidad'}), 'odontology')

    // await user.type(screen.getByRole('combobox', {name: /Doctor/i}), 'doctor')
    await user.type(screen.getByRole('textbox', {name: 'Cédula'}), '2200129381')
    await user.type(screen.getByPlaceholderText('Nombre del Doctor'), 'Doe')
    
    await user.type(screen.getByRole('textbox',{name: 'Cédula Buscar'}), '2200129381')
    await user.type(screen.getByPlaceholderText('Nombre del paciente'), 'John')

    await user.click(screen.getByRole('button', {name: /Registrar Cita/i}))
  })

  // test('should submit the form', async () => {    
  //   const spy = vi.fn()
  //   NewAppointmentForm.prototype.handleSubmit = spy
      
  //   fireEvent.click(screen.getByRole('button', {name: /Registrar Cita/i}))

  //   expect(spy).toHaveBeenCalled()
  // })

})