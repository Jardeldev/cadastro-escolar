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