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
