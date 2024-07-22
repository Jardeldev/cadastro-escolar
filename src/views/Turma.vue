<script lang="ts">
import { defineComponent, ref } from 'vue'
import { fetchTurmas } from '@/utils/api'
import TurmaList from '@/components/TurmaList.vue'
import TurmaDetails from '@/components/TurmaDetails.vue'

export default defineComponent({
  components: {
    TurmaList,
    TurmaDetails,
  },
  setup() {
    const turmas = ref(fetchTurmas())
    const selectedTurma = ref(null)

    const viewTurmaDetails = (turma: null) => {
      selectedTurma.value = turma
    }

    const openAddModel = () => {
      // Lógica para abrir o modal de adicionar turma
    }

    return {
      turmas,
      selectedTurma,
      viewTurmaDetails,
      openAddModel,
    }
  },
})
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Gestão de Turmas</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div class="form-container">
        <turma-list :turmas="turmas" @view-details="viewTurmaDetails" />
        <turma-details v-if="selectedTurma" :turma-detail="selectedTurma" />
        <ion-button expand="block" @click="openAddModel">
          <ion-icon slot="start" name="add-outline" />
          Adicionar Turma
        </ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<style scoped>
.form-container {
    max-width: 700px;
    margin: 0 auto;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    margin-top: 50px;
    margin-bottom: 50px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
}
</style>
