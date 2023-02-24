import Appointments from "../../pages/Appointments";
import Doctors from "../../pages/Doctors";
import Patients from "../../pages/Patients";
import { OptionService } from "../../types";

export const options: OptionService[] = [
  {
    title: "Gestión Pacientes",
    description: "Aquí podrás observar todos los pacientes registrados en el sistema",
    to: "/pacientes",
    path: "/pacientes",
    Component: Patients
  },
  {
    title: "Gestión Médicos",
    description: "Aquí podrás observar todos los medicos registrados en el sistema",
    to: "/doctores",
    path: "/doctores",
    Component: Doctors
  },
  {
    title: "Gestión Citas",
    description: "Aquí podrás observar todos las citas registradas en el sistema",
    to: "/citas",
    path: "/citas",
    Component: Appointments
  }
]