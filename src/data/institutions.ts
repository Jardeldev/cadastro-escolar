export interface Institution {
  id: number
  name: string
  acronym: string
  address: string
  phone: string
  email: string
  description?: string
}

const institutions: Institution[] = [
  { id: 1, name: 'Institution 1', acronym: 'INST1', address: 'Address 1', phone: '1234567890', email: 'inst1@example.com', description: 'Description for Institution 1' },
  { id: 2, name: 'Institution 2', acronym: 'INST2', address: 'Address 2', phone: '0987654321', email: 'inst2@example.com', description: 'Description for Institution 2' },
  // Adicione mais instituições conforme necessário
]

export default institutions
