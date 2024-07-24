<script lang="ts">
import { defineComponent } from 'vue'
import { IonButton, IonItem, IonLabel, IonList } from '@ionic/vue'

// Interface que define a estrutura de uma instituição
export interface Institution {
  id: number
  name: string
  acronym: string
  address: string
  phone: string
  email: string
  description: string
  schools: string
  series: string
  turmas: string
  teachers: string
  schedule: string
  discipline: string
}

export default defineComponent({
  components: {
    IonList,
    IonItem,
    IonLabel,
    IonButton,
  },
  props: {
    institutions: {
      type: Array as () => Institution[],
      required: true,
    },
  },
  emits: ['deleteInstitution', 'editInstitution'],
  setup(props, { emit }) {
    const deleteInstitution = (institution: Institution) => {
      emit('deleteInstitution', institution)
    }

    const editInstitution = (institution: Institution) => {
      emit('editInstitution', institution)
    }

    return {
      deleteInstitution,
      editInstitution,
    }
  },
})
</script>

<template>
  <ion-accordion-group>
    <ion-accordion value="institutionsAccordion" class="accordion-item">
      <ion-item slot="header" color="light">
        <ion-label>Escolas Cadastradas</ion-label>
      </ion-item>
      <div slot="content">
        <ion-list>
          <ion-item v-for="institution in institutions" :key="institution.id">
            <ion-label>{{ institution.schools }}</ion-label>
            <ion-button @click="editInstitution(institution)">
              Editar
            </ion-button>
            <ion-button @click="deleteInstitution(institution)">
              Excluir
            </ion-button>
          </ion-item>
        </ion-list>
      </div>
    </ion-accordion>
  </ion-accordion-group>
</template>

<style scoped>
.accordion-item {
  width: 100%;
  max-width: 500px;
  margin: 10px auto; /* Adicionando margem para centralizar */
}
</style>
