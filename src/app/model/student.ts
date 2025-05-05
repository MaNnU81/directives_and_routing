export interface Student {
    name: string
    surname: string
    country: string
    gender?: string
    dob: string
    imageUrl?: string
    marks: number[]
    id?: string
  }

  export interface User {
    email: string
    password: string
    id?: string; 
  }