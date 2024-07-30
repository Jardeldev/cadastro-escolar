<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { IonCol, IonGrid, IonItem, IonLabel, IonRow, IonSelect, IonSelectOption } from '@ionic/vue'
import type { Institution } from '../utils/api'
import { loadFromLocalStorage } from '../utils/api'

// Define component-specific states
const institutions = ref<Institution[]>([])
const selectedInstitutionId = ref<number | null>(null)

// Load institutions from localStorage
onMounted(() => {
  institutions.value = loadFromLocalStorage()
})

// Computed properties to filter and retrieve unique items
const filteredInstitutions = computed(() => {
  let result = institutions.value

  if (selectedInstitutionId.value) {
    result = result.filter(institution => institution.id === selectedInstitutionId.value)
  }

  return result
})
</script>

<template>
  <ion-grid>
    <!-- Filters -->
    <ion-row>
      <ion-col size="12">
        <ion-item>
          <ion-label>Instituições</ion-label>
          <ion-select v-model="selectedInstitutionId" placeholder="Selecione uma Instituição">
            <ion-select-option v-for="institution in institutions" :key="institution.id" :value="institution.id">
              {{ institution.name }}
            </ion-select-option>
          </ion-select>
        </ion-item>
      </ion-col>

      <!-- Display Timetable -->
      <ion-row>
        <ion-col size="12">
          <ion-grid>
            <ion-row>
              <ion-col size="4">
                <ion-label>Instituições</ion-label>
              </ion-col>
            </ion-row>
            <ion-row v-for="institution in filteredInstitutions" :key="institution.id">
              <ion-col size="4">
                {{ institution.name }}
              </ion-col>
              <ion-col size="2">
                {{ institution.schedule }}
              </ion-col>
              <ion-col size="2">
                {{ institution.turmas }}
              </ion-col>
              <ion-col size="2">
                {{ institution.teachers }}
              </ion-col>
              <ion-col size="2">
                {{ institution.discipline }}
              </ion-col>
            </ion-row>
          </ion-grid>
        </ion-col>
      </ion-row>
    </ion-row>
  </ion-grid>
</template>

<style scoped>
ion-col {
  background-color: #135d54;
  border: solid 1px #fff;
  color: #fff;
  text-align: center;
}

ion-grid {
  padding-top: 100px;
}
</style>
