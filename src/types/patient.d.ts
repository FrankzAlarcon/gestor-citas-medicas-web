import { string } from "yup";

export interface CreatePatientDto {
  identification: string,
  name: string,
  email: string,
  age: string
}

export type CreatePatientDtoCV = Omit<CreatePatientDto, 'age'> & {
  age: number
}

export interface Patient extends CreatePatientDtoCV{
  NO_ID_FIELD: string
}