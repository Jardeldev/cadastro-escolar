export interface Turma {
  id: number;
  name: string;
  description?: string;
}

const turmas: Turma[] = [
  { id: 1, name: 'Turma 1', description: 'Description for Turma 1' },
  { id: 2, name: 'Turma 2', description: 'Description for Turma 2' },
  // Adicione mais turmas conforme necessário
];

export default turmas;
