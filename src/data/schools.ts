export interface School {
  id: number
  name: string
  address?: string
  phone?: string
  email?: string
  description?: string
}

const schools: School[] = [
  { id: 1, name: 'School 1', address: 'Address 1', phone: '1234567890', email: 'school1@example.com', description: 'Description for School 1' },
  { id: 2, name: 'School 2', address: 'Address 2', phone: '0987654321', email: 'school2@example.com', description: 'Description for School 2' },
]

export default schools
