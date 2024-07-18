export interface Series {
  id: number;
  name: string;
  description?: string;
}

const series: Series[] = [
  { id: 1, name: 'Series 1', description: 'Description for Series 1' },
  { id: 2, name: 'Series 2', description: 'Description for Series 2' },
  // Adicione mais séries conforme necessário
];

export default series;
