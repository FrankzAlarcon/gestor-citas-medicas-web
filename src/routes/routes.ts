import Appointments from "../pages/Appointments";
import Doctors from "../pages/Doctors";
import Home from "../pages/Home";
import NewAppointment from "../pages/NewAppointment";
import NewDoctor from "../pages/NewDoctor";
import NewPatient from "../pages/NewPatient";
import Patients from "../pages/Patients";
import { Route } from "../types";

export const routes: Route[] = [
  {
    to: "/",
    path: "/",
    name: "Home",
    Component: Home
  },
  {
    to: "/nuevo-paciente",
    path: "/nuevo-paciente",
    name: "Nuevo Paciente",
    Component: NewPatient
  },
  {
    to: "/nuevo-doctor",
    path: "/nuevo-doctor",
    name: "Nuevo Doctor",
    Component: NewDoctor
  },
  {
    to: "/nueva-cita",
    path: "/nueva-cita",
    name: "Nueva Cita",
    Component: NewAppointment
  }
]