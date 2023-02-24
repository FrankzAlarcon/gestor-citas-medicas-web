export interface Route {
  to: string
  path: string
  name: string
  Component: () => JSX.Element
}

export interface OptionService {
  title: string
  description: string
  to: string
  path: string
  Component: () => JSX.Element
}

export interface Specialty {
  value: string
  text: string
}