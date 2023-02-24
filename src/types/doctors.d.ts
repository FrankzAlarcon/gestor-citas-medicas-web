export interface CreateDoctorDto {
  identification: string
  name: string
  email: string
  age: string
  specialty: string
}

export interface CreateDoctorDtoCV {
  identification: string
  name: string
  email: string
  age: number
  specialty: string
}

export interface Doctor extends CreateDoctorDtoCV {
  NO_ID_FIELD: string
}