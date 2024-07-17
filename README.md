# Sistema Escolar com Ionic Framework e Vue 3

## Organização do Projeto e Primeiros Passos

### Visão Geral do Projeto

Para começar o projeto, é importante ter uma visão clara de onde queremos chegar e como vamos organizar nossas tarefas. Vamos seguir alguns passos importantes:

1. **Dividir o Projeto em Partes Menores**: Vamos dividir o projeto em partes menores e gerenciáveis, começando pela tela de instituição, depois avançando para escolas, séries, turmas, e assim por diante.
2. **Planejar e Priorizar**: Planeje e priorize as tarefas de acordo com a dependência lógica entre elas. Começaremos com a tela de instituição, pois ela é o ponto de partida para inserir escolas e outras informações.
3. **Trabalhar Iterativamente**: Desenvolver o projeto iterativamente, completando uma funcionalidade de cada vez e garantindo que ela esteja funcionando corretamente antes de passar para a próxima.

### Passos Iniciais e Dicas

1. **Configuração do Ambiente de Desenvolvimento**
    - Certifique-se de ter o Node.js e o pnpm instalados.
    - Crie um novo projeto Ionic com suporte a TypeScript e configure o ESLint para seguir as melhores práticas de código.

    ```bash
    npm install -g @ionic/cli
    ionic start schoolSystem blank --type vue
    cd schoolSystem
    pnpm install
    ```

2. **Criação da Estrutura de Dados**
    - Divida os dados em arquivos separados e use IDs para referenciá-los.
    - Crie arquivos para armazenar instituições, escolas, séries, turmas e professores.

3. **Tela de Instituições**
    - Comece criando a tela de instituições. Esta será a primeira tela que o usuário verá e servirá como ponto de partida para navegar para as escolas.
    - Crie um componente `InstitutionList.vue` para listar as instituições e permitir que o usuário selecione uma para ver as escolas.

4. **Navegação para Escolas**
    - Após configurar a tela de instituições, configure a navegação para listar as escolas associadas a uma instituição selecionada.
    - Crie um componente `SchoolList.vue` para listar as escolas e permitir que o usuário navegue para as séries.

5. **Organização e Planejamento de Tarefas**
    - Divida o desenvolvimento em sprints semanais, onde cada sprint foca em uma funcionalidade específica (por exemplo, telas de instituições na primeira semana, telas de escolas na segunda semana, e assim por diante).
    - Realize reuniões diárias rápidas para revisar o progresso e ajustar o plano conforme necessário.

### Estrutura dos Dados com Referência por ID

#### Arquivo `institutions.ts`

```typescript
// src/data/institutions.ts

export const institutions = [
  { id: 1, name: 'Instituição XYZ' }
]
```

#### Arquivo `schools.ts`

```typescript
// src/data/schools.ts

export const schools = [
  { id: 1, institutionId: 1, name: 'Escola Mercúrio' },
  { id: 2, institutionId: 1, name: 'Escola Vênus' },
  { id: 3, institutionId: 1, name: 'Escola Terra' }
]
```

#### Arquivo `series.ts`

```typescript
// src/data/series.ts

export const series = [
  { id: 1, schoolId: 1, name: 'Educação Infantil' },
  { id: 2, schoolId: 1, name: 'Ensino Fundamental I' },
  { id: 3, schoolId: 2, name: 'Ensino Fundamental II' }
]
```

#### Arquivo `classes.ts`

```typescript
// src/data/classes.ts

export const classes = [
  { id: 1, seriesId: 1, name: 'Creche' },
  { id: 2, seriesId: 1, name: 'Pré I' },
  { id: 3, seriesId: 2, name: '1º ano' }
]
```

#### Arquivo `turmas.ts`

```typescript
// src/data/turmas.ts

export const turmas = [
  { id: 1, classId: 1, name: 'Turma A', professor: 'Marie Curie', horario: 'Matutino (08:00 - 12:00)', disciplinas: ['Brincadeiras Educativas', 'Artes'] },
  { id: 2, classId: 1, name: 'Turma B', professor: 'Isaac Newton', horario: 'Vespertino (13:00 - 17:00)', disciplinas: ['Brincadeiras Educativas', 'Artes'] }
]
```

### Exemplo de Componentes e Navegação

#### InstitutionList.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { institutions } from '@/data/institutions'

const institutionsRef = ref(institutions)

function selectInstitution(institution: any) {
  console.log('Selected institution:', institution)
  // Navegar para a página das escolas
}
</script>

<template>
  <ion-list>
    <ion-item v-for="institution in institutions" :key="institution.id" @click="selectInstitution(institution)">
      <ion-label>{{ institution.name }}</ion-label>
    </ion-item>
  </ion-list>
</template>
```

#### SchoolList.vue

```vue
<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { schools } from '@/data/schools'

const route = useRoute()
const institutionId = Number.parseInt(route.params.institutionId)

const filteredSchools = computed(() => {
  return schools.filter(school => school.institutionId === institutionId)
})

function selectSchool(school: any) {
  console.log('Selected school:', school)
  // Navegar para a página das séries
}
</script>

<template>
  <ion-list>
    <ion-item v-for="school in filteredSchools" :key="school.id" @click="selectSchool(school)">
      <ion-label>{{ school.name }}</ion-label>
    </ion-item>
  </ion-list>
</template>
```

### Configurando o Router

```javascript
// src/router/index.ts

import { createRouter, createWebHistory } from '@ionic/vue-router'
import Home from '../views/Home.vue'
import SchoolList from '../components/SchoolList.vue'

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/schools/:institutionId',
    component: SchoolList,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
```

### Diagrama da Estrutura do Sistema Escolar

```plaintext
Instituição XYZ
├── Escola Mercúrio
│   ├── Séries
│   │   ├── Educação Infantil
│   │   │   ├── Creche
│   │   │   │   ├── Turma A
│   │   │   │   │   ├── Professor: Marie Curie
│   │   │   │   │   ├── Horário: Matutino (08:00 - 12:00)
│   │   │   │   │   ├── Disciplinas: Brincadeiras Educativas, Artes
│   │   │   │   ├── Turma B
│   │   │   │   │   ├── Professor: Isaac Newton
│   │   │   │   │   ├── Horário: Vespertino (13:00 - 17:00)
│   │   │   │   │   ├── Disciplinas: Brincadeiras Educativas, Artes
│   │   │   ├── Pré I
│   │   │   │   ├── Turma A
│   │   │   │   │   ├── Professor: Galileo Galilei
│   │   │   │   │   ├── Horário: Integral (08:00 - 17:00)
│   │   │   │   │   ├── Disciplinas: Linguagem, Matemática, Música
│   │   │   ├── Pré II
│   │   │   │   ├── Turma A
│   │   │   │   │   ├── Professor: Nikola Tesla
│   │   │   │   │   ├── Horário: Matutino (08:00 - 12:00)
│   │   │   │   │   ├── Disciplinas: Linguagem, Matemática, Música
│   │   ├── Ensino Fundamental I
│   │   │   ├── 1º ano
│   │   │   │   ├── Turma A
│   │   │   │   │   ├── Professor: Albert Einstein
│   │   │   │   │   ├── Horário: Vespertino (13:00 - 17:00)
│   │   │   │   │   ├── Disciplinas: Português, Matemática, Ciências
│   │   │   │   ├── Turma B
│   │   │   │   │   ├── Professor: Richard Feynman
│   │   │   │   │   ├── Horário: Matutino (08:00 - 12:00)
│   │   │   ├── 2º ano
│   │   │   │   ├── Turma A
│   │   │   │   │   ├── Professor: Charles Darwin
│   │   │   │   │   ├── Horário: Integral (08:00 - 17:00)
│   │   │   │   ├── Turma B
│   │   │   │   │   ├── Professor: Alan Turing
│   │   │   │   │   ├── Horário: Vespertino (13:00 - 17:00)
│   │   │   ├── 3º ano
│   │   │   │   ├── Turma A
│   │   │   │   │   ├── Professor: Stephen Hawking
│   │   │   │   │   ├── Horário: Matutino (08:00 - 12:00)
│   │   │   │   ├── Turma B
│   │   │   │   │   ├── Professor: Isaac Asimov
│   │   │   │   │   ├── Horário: Vespertino (13:00 - 17:00)
├── Escola Vênus
│   ├── Séries
│   │   ├── Ensino Fundamental I
│   │   │   ├── 4º ano
│   │   │   │   ├── Turma A
│   │   │   │   │   ├── Professor: Rosalind Franklin
│   │   │   │   │   ├── Horário: Vespertino (13:00 - 17:00)
│   │   │   │   ├── Turma B
│   │   │   │   │   ├── Professor: Gregor Mendel
│   │   │   │   │   ├── Horário: Integral (08:00 - 17:00)
│   │   │   ├── 5º ano
│   │   │   │   ├── Turma A
│   │   │   │   │   ├── Professor: Ada Lovelace
│   │   │   │   │   ├── Horário: Matutino (08:00 - 12:00)
│   │   │   │   ├── Turma B
│   │   │   │   │   ├── Professor: James Clerk Maxwell
│   │   │   │   │   ├── Horário: Vespertino (13:00 - 17:00)
│   │   │   │   ├── Turma C
│   │   │   │   │   ├── Professor: Michael Faraday
│   │   │   │   │   ├── Horário: Integral (08:00 - 17:00)
│   │   ├── Ensino Fundamental II
│   │   │   ├── 6º ano
│   │   │   │   ├── Turma A
│   │   │   │   │   ├── Professor: Richard Feynman
│   │   │   │   │   ├── Horário: Matutino (08:00 - 12:00)
│   │   │   │   ├── Turma B
│   │   │   │   │   ├── Professor: Stephen Jay Gould
│   │   │   │   │   ├── Horário: Integral (08:00 - 17:00)
│   │   │   ├── 7º ano
│   │   │   │   ├── Turma A
│   │   │   │   │   ├── Professor: Dorothy Hodgkin
│   │   │   │   │   ├── Horário: Vespertino (13:00 - 17:00)
│   │   │   │   ├── Turma B
│   │   │   │   │   ├── Professor: Niels Bohr
│   │   │   │   │   ├── Horário: Integral (08:00 - 17:00)
├── Escola Terra
│   ├── Séries
│   │   ├── Ensino Fundamental II
│   │   │   ├── 8º ano
│   │   │   │   ├── Turma A
│   │   │   │   │   ├── Professor: Carl Sagan
│   │   │   │   │   ├── Horário: Matutino (08:00 - 12:00)
│   │   │   │   ├── Turma B
│   │   │   │   │   ├── Professor: Jane Goodall
│   │   │   │   │   ├── Horário: Vespertino (13:00 - 17:00)
│   │   │   │   ├── Turma C
│   │   │   │   │   ├── Professor: Neil deGrasse Tyson
│   │   │   │   │   ├── Horário: Integral (08:00 - 17:00)
│   │   │   ├── 9º ano
│   │   │   │   ├── Turma A
│   │   │   │   │   ├── Professor: Alan Turing
│   │   │   │   │   ├── Horário: Integral (08:00 - 17:00)
│   │   │   │   ├── Turma B
│   │   │   │   │   ├── Professor: Katherine Johnson
│   │   │   │   │   ├── Horário: Matutino (08:00 - 12:00)
│   │   │   │   ├── Turma C
│   │   │   │   │   ├── Professor: Rosalind Franklin
│   │   │   │   │   ├── Horário: Vespertino (13:00 - 17:00)
```

Para gerenciar os dados da Instituição XYZ, incluindo suas escolas, séries, turmas, professores, horários e disciplinas, será necessário criar várias telas no sistema. Vou descrever as telas essenciais e explicar cada uma delas detalhadamente para que seu estagiário entenda a importância e a função de cada tela.

### Telas Necessárias

1. **Tela de Login**: Uma tela inicial para que os usuários possam fazer login no sistema, garantindo que apenas usuários autorizados tenham acesso às funcionalidades de gestão.
2. **Tela de Dashboard**: Após o login, o usuário será redirecionado para um painel de controle (dashboard) que oferece uma visão geral do sistema, mostrando informações importantes e atalhos para as principais funcionalidades.
3. **Tela de Listagem de Instituições**: Uma tela que lista todas as instituições cadastradas no sistema. Aqui, o usuário pode ver a lista de instituições e selecionar uma para gerenciar suas escolas.
4. **Tela de Detalhes da Instituição**: Ao selecionar uma instituição na tela de listagem, o usuário será levado para esta tela, onde pode ver e editar os detalhes da instituição, bem como acessar as escolas associadas a ela.
5. **Tela de Listagem de Escolas**: Uma tela que lista todas as escolas de uma determinada instituição. O usuário pode selecionar uma escola para gerenciar suas séries e turmas.
6. **Tela de Detalhes da Escola**: Ao selecionar uma escola na tela de listagem, o usuário será levado para esta tela, onde pode ver e editar os detalhes da escola, bem como acessar as séries associadas a ela.
7. **Tela de Listagem de Séries**: Uma tela que lista todas as séries de uma determinada escola. O usuário pode selecionar uma série para gerenciar suas turmas.
8. **Tela de Detalhes da Série**: Ao selecionar uma série na tela de listagem, o usuário será levado para esta tela, onde pode ver e editar os detalhes da série, bem como acessar as turmas associadas a ela.
9. **Tela de Listagem de Turmas**: Uma tela que lista todas as turmas de uma determinada série. O usuário pode selecionar uma turma para gerenciar seus detalhes, incluindo professores, horários e disciplinas.
10. **Tela de Detalhes da Turma**: Ao selecionar uma turma na tela de listagem, o usuário será levado para esta tela, onde pode ver e editar os detalhes da turma, incluindo a atribuição de professores, horários e disciplinas.

### Descrição Detalhada das Telas

#### Tela de Login
- **Objetivo**: Autenticar o usuário e garantir acesso seguro ao sistema.
- **Funcionalidades**: Campos para nome de usuário e senha, botão de login, e opção de recuperação de senha.

#### Tela de Dashboard
- **Objetivo**: Fornecer uma visão geral do sistema e acesso rápido às principais funcionalidades.
- **Funcionalidades**: Resumo de instituições, escolas, séries e turmas, atalhos para as telas de gestão, notificações e gráficos de uso.

#### Tela de Listagem de Instituições
- **Objetivo**: Listar todas as instituições cadastradas no sistema.
- **Funcionalidades**: Exibição de uma lista de instituições com opções para adicionar nova instituição, editar ou excluir instituições existentes.

#### Tela de Detalhes da Instituição
- **Objetivo**: Exibir e editar os detalhes de uma instituição específica.
- **Funcionalidades**: Campos para nome da instituição, endereço, contato, e lista de escolas associadas com opções para adicionar, editar ou remover escolas.

#### Tela de Listagem de Escolas
- **Objetivo**: Listar todas as escolas associadas a uma instituição.
- **Funcionalidades**: Exibição de uma lista de escolas com opções para adicionar nova escola, editar ou excluir escolas existentes.

#### Tela de Detalhes da Escola
- **Objetivo**: Exibir e editar os detalhes de uma escola específica.
- **Funcionalidades**: Campos para nome da escola, endereço, contato, e lista de séries associadas com opções para adicionar, editar ou remover séries.

#### Tela de Listagem de Séries
- **Objetivo**: Listar todas as séries de uma escola.
- **Funcionalidades**: Exibição de uma lista de séries com opções para adicionar nova série, editar ou excluir séries existentes.

#### Tela de Detalhes da Série
- **Objetivo**: Exibir e editar os detalhes de uma série específica.
- **Funcionalidades**: Campos para nome da série e lista de turmas associadas com opções para adicionar, editar ou remover turmas.

#### Tela de Listagem de Turmas
- **Objetivo**: Listar todas as turmas de uma série.
- **Funcionalidades**: Exibição de uma lista de turmas com opções para adicionar nova turma, editar ou excluir turmas existentes.

#### Tela de Detalhes da Turma
- **Objetivo**: Exibir e editar os detalhes de uma turma específica.
- **Funcionalidades**: Campos para nome da turma, professor responsável, horário das aulas, e disciplinas ministradas.

### Marcos de Conclusão do Projeto

Para definir o projeto como "finalizado", os seguintes marcos devem ser alcançados:

1. **Requisitos e Planejamento**: Todos os requisitos foram identificados, documentados e o plano do projeto foi aprovado.
2. **Desenvolvimento**: Todas as funcionalidades principais foram desenvolvidas, integradas e testadas.
3. **Testes e Qualidade**: Os testes unitários, de integração, sistema e aceitação do usuário foram concluídos com sucesso.
4. **Documentação**: A documentação do código, do usuário final e do sistema foi completada.
5. **Desempenho e Segurança**: O sistema foi otimizado para desempenho e passou em todos os testes de carga e segurança.
6. **Treinamento e Transferência de Conhecimento**: Os usuários finais foram treinados e a transferência de conhecimento para a equipe de suporte/manutenção foi realizada.
7. **Entrega e Implementação**: O sistema foi entregue, implementado no ambiente de produção e todos os problemas de lançamento foram resolvidos.
8. **Feedback e Ajustes Finais**: O feedback pós-implementação foi coletado, analisado e os ajustes finais foram realizados.
9. **Encerramento do Projeto**: A reunião de encerramento do projeto foi realizada, todas as entregas foram aceitas pelo cliente/usuário final, a documentação de encerramento foi concluída e arquivada, e o projeto foi oficialmente encerrado.
