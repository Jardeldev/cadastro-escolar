export interface Class {
  id: number
  name: string
  description?: string
}

const classes: Class[] = [
  { id: 1, name: 'Class 1', description: 'Description for Class 1' },
  { id: 2, name: 'Class 2', description: 'Description for Class 2' },
  // Adicione mais classes conforme necessário
]

export default classes
