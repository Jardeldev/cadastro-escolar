<script setup lang="ts">
import { defineProps } from 'vue'

interface School {
  id: number
  name: string
  address: string
  phone: string
  email: string
  description: string
}

interface Institution {
  id: number
  name: string
  // Add other properties as needed
}

interface Series {
  id: number
  name: string
  // Add other properties as needed
}

interface Turmas {
  id: number
  name: string
  // Add other properties as needed
}

interface Classes {
  id: number
  name: string
  // Add other properties as needed
}

defineProps<{
  schoolDetail: School
  institution: Institution | null
  series: Series[]
  turmas: Turmas[]
  classes: Classes[]
}>()
</script>

<template>
  <div v-if="schoolDetail">
    <h2>Detalhes da Escola</h2>
    <p><strong>Nome:</strong> {{ schoolDetail.name }}</p>
    <p><strong>Endereço:</strong> {{ schoolDetail.address }}</p>
    <p><strong>Telefone:</strong> {{ schoolDetail.phone }}</p>
    <p><strong>E-mail:</strong> {{ schoolDetail.email }}</p>
    <p><strong>Descrição:</strong> {{ schoolDetail.description }}</p>

    <!-- Display institution details -->
    <div v-if="institution">
      <h3>Instituição</h3>
      <p><strong>Nome:</strong> {{ institution.name }}</p>
      <!-- Add other institution details as needed -->
    </div>

    <!-- Display series -->
    <div v-if="series.length">
      <h3>Séries</h3>
      <ul>
        <li v-for="serie in series" :key="serie.id">
          {{ serie.name }}
        </li>
      </ul>
    </div>

    <!-- Display turmas -->
    <div v-if="turmas.length">
      <h3>Turmas</h3>
      <ul>
        <li v-for="turma in turmas" :key="turma.id">
          {{ turma.name }}
        </li>
      </ul>
    </div>

    <!-- Display classes -->
    <div v-if="classes.length">
      <h3>Classes</h3>
      <ul>
        <li v-for="classe in classes" :key="classe.id">
          {{ classe.name }}
        </li>
      </ul>
    </div>
  </div>
</template>
