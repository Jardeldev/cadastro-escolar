<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { IonCol, IonContent, IonGrid, IonItem, IonLabel, IonPage, IonRow, IonSelect, IonSelectOption } from '@ionic/vue'

interface Institution {
  id: number
  name: string
  acronym: string
  address: string
  phone: string
  email: string
  description: string
  schools: string // Deve ser uma string separada por vírgulas
  series: string
  turmas: string
  teachers: string
  schedule: string
  discipline: string
}

// Define component-specific states
const institutions = ref<Institution[]>([])
const selectedInstitutionId = ref<number | null>(null)
const selectedSchool = ref<string | null>(null)
const selectedSerie = ref<string | null>(null)
const selectedDiscipline = ref<string | null>(null)
const selectedTurma = ref<string | null>(null)

// Dias da semana
const daysOfWeek = [
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
]

const timeSlots = ['08:00 - 09:00', '09:00 - 10:00', '10:00 - 11:00', '11:00 - 12:00', '12:00 - 13:00', '13:00 - 14:00', '14:00 - 15:00', '15:00 - 16:00', '16:00 - 17:00']

onMounted(() => {
  const storedInstitutions = localStorage.getItem('institutions')
  if (storedInstitutions) {
    institutions.value = JSON.parse(storedInstitutions)
  }
})

const filteredInstitutions = computed(() => {
  if (selectedInstitutionId.value) {
    return institutions.value.filter(institution => institution.id === selectedInstitutionId.value)
  }
  return institutions.value
})

const schools = computed(() => {
  const allSchools = new Set<string>()
  institutions.value.forEach((institution) => {
    if (typeof institution.schools === 'string' && institution.schools) {
      institution.schools.split(',').forEach((school) => {
        if (school.trim()) {
          allSchools.add(school.trim())
        }
      })
    }
  })
  return Array.from(allSchools)
})

const series = computed(() => {
  const allSeries = new Set<string>()
  institutions.value.forEach((institution) => {
    if (typeof institution.series === 'string' && institution.series) {
      institution.series.split(',').forEach((serie) => {
        if (serie.trim()) {
          allSeries.add(serie.trim())
        }
      })
    }
  })
  return Array.from(allSeries)
})

const disciplines = computed(() => {
  const allDisciplines = new Set<string>()
  institutions.value.forEach((institution) => {
    if (typeof institution.discipline === 'string' && institution.discipline) {
      institution.discipline.split(',').forEach((discipline) => {
        if (discipline.trim()) {
          allDisciplines.add(discipline.trim())
        }
      })
    }
  })
  return Array.from(allDisciplines)
})

const turmas = computed(() => {
  const allTurmas = new Set<string>()
  institutions.value.forEach((institution) => {
    if (typeof institution.turmas === 'string' && institution.turmas) {
      institution.turmas.split(',').forEach((turma) => {
        if (turma.trim()) {
          allTurmas.add(turma.trim())
        }
      })
    }
  })
  return Array.from(allTurmas)
})

function getScheduleForDay(day: string, timeSlot: string) {
  // Implementar a lógica para obter o horário para um determinado dia e intervalo de tempo
  return ''
}
</script>

<template>
  <ion-page>
    <ion-content class="ion-padding">
      <ion-grid>
        <!-- Seção de Seleção -->
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
          <ion-col size="12">
            <ion-item>
              <ion-label>Escolas</ion-label>
              <ion-select v-model="selectedSchool" placeholder="Selecione uma Escola">
                <ion-select-option v-for="school in schools" :key="school" :value="school">
                  {{ school }}
                </ion-select-option>
              </ion-select>
            </ion-item>
          </ion-col>
          <ion-col size="12">
            <ion-item>
              <ion-label>Séries</ion-label>
              <ion-select v-model="selectedSerie" placeholder="Selecione uma Série">
                <ion-select-option v-for="serie in series" :key="serie" :value="serie">
                  {{ serie }}
                </ion-select-option>
              </ion-select>
            </ion-item>
          </ion-col>
          <ion-col size="12">
            <ion-item>
              <ion-label>Turmas</ion-label>
              <ion-select v-model="selectedTurma" placeholder="Selecione uma Turma">
                <ion-select-option v-for="turma in turmas" :key="turma" :value="turma">
                  {{ turma }}
                </ion-select-option>
              </ion-select>
            </ion-item>
          </ion-col>
        </ion-row>

        <!-- Seção de Tabela de Horário -->
        <ion-row>
          <ion-col size="12">
            <ion-grid>
              <ion-row>
                <ion-col size="2">
                  <ion-label>Horário</ion-label>
                </ion-col>
                <ion-col v-for="day in daysOfWeek" :key="day" size="2">
                  <ion-label>{{ day }}</ion-label>
                </ion-col>
              </ion-row>

              <!-- Linha de Horário -->
              <ion-row v-for="timeSlot in timeSlots" :key="timeSlot">
                <ion-col size="2">
                  <ion-label>{{ timeSlot }}</ion-label>
                </ion-col>
                <ion-col v-for="day in daysOfWeek" :key="day" size="2">
                  <ion-label>{{ getScheduleForDay(day, timeSlot) }}</ion-label>
                </ion-col>
              </ion-row>
            </ion-grid>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<style scoped>
ion-col {
  background-color: #135d54;
  border: solid 1px #fff;
  color: #fff;
  text-align: center;
}

ion-grid {
  margin-top: 50px;
}

ion-content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

ion-label {
  font-size: 14px;
}
</style>
