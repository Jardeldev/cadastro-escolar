<template>
  <Menu />
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Gestão de Escolas</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-modal :is-open="isAddModalOpen" css-class="my-custom-modal">
        <ion-header>
        </ion-header>
        <ion-content class="modal-content">
          <div class="form-container">
            <ion-item class="form-item">
              <ion-label position="fixed">Nome *</ion-label>
              <ion-input v-model="institutionForm.name" required></ion-input>
            </ion-item>
            <ion-item class="form-item">
              <ion-label position="fixed">Sigla *</ion-label>
              <ion-input v-model="institutionForm.acronym" required></ion-input>
            </ion-item>
            <ion-item class="form-item">
              <ion-label position="fixed">Endereço *</ion-label>
              <ion-input v-model="institutionForm.address" required></ion-input>
            </ion-item>
            <ion-item class="form-item">
              <ion-label position="fixed">Telefone *</ion-label>
              <ion-input v-model="institutionForm.phone" required></ion-input>
            </ion-item>
            <ion-item class="form-item">
              <ion-label position="fixed">E-mail *</ion-label>
              <ion-input v-model="institutionForm.email" type="email" required></ion-input>
            </ion-item>
            <ion-item class="form-item">
              <ion-label position="fixed">Descrição</ion-label>
              <ion-textarea v-model="institutionForm.description"></ion-textarea>
            </ion-item>
            <ion-button expand="block" @click="saveInstitution">
              {{ editMode ? 'Salvar Alterações' : 'Adicionar' }}
            </ion-button>
          </div>
        </ion-content>
      </ion-modal>
    </ion-content>
  </ion-page>
</template>


  

<script lang="ts">
import Menu from '@/components/Menu.vue';
import { defineComponent, ref } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon, IonList, IonItem, IonLabel, IonInput, IonModal, IonSearchbar } from '@ionic/vue';
import { fetchInstitutions } from '@/utils/api';
import InstitutionList from '@/components/InstitutionList.vue';
import InstitutionDetails from '@/components/InstitutionDetails.vue';

interface Institution {
    id: number;
    name: string;
    acronym: string;
    address: string;
    phone: string;
    email: string;
    description: string;
}

export default defineComponent({
    components: {
        Menu,
        IonPage,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonContent,
        InstitutionList,
        InstitutionDetails,
        IonSearchbar,
        IonToolbar,

    },
    setup() {
        const institutions = ref(fetchInstitutions());
        const selectedInstitution = ref(null);
        const isAddModalOpen = ref(false);
        const editMode = ref(false);
        const institutionForm = ref<Institution>({ id: null, name: '', acronym: '', address: '', phone: '', email: '', description: '', valid: false });

        const viewInstitutionDetails = (institution) => {
        selectedInstitution.value = institution;
        };

        const openAddModel = () => {
            isAddModalOpen.value = true;
            editMode.value = false;
            institutionForm.value = { id: null, name: '', acronym: '', address: '', phone: '', email: '', description: '', valid: false };
        };

        const openEditModel = (item: Institution) => {
            isAddModalOpen.value = true;
            editMode.value = true;
            institutionForm.value = {...item };
        };

        const addModalDismiss = () => {
            isAddModalOpen.value = false;
        };

        const saveInstitution = async () => {
            try {
                if (editMode.value) {
                    const index = institutions.value.findIndex((i) => i.id === institutionForm.value.id);
                    institutions.value[index] = {...institutionForm.value };
                } else {
                    const newInstitution: Institution = {...institutionForm.value, id: Date.now() };
                    institutions.value.push(newInstitution);
                }
                await new Promise((resolve) => setTimeout(resolve, 500));
                addModalDismiss();
            } catch (error) {
                console.error('Error saving institution:', error);
            }
        };

        const deleteInstitution = async (item: Institution) => {
            try {
                const index = institutions.value.findIndex((i) => i.id === item.id);
                institutions.value.splice(index, 1);
                await new Promise((resolve) => setTimeout(resolve, 500));
            } catch (error) {
                console.error('Error deleting institution:', error);
            }
        };

        return {
            institutions,
            selectedInstitution,
            viewInstitutionDetails,
            isAddModalOpen,
            editMode,
            institutionForm,
            openAddModel,
            openEditModel,
            addModalDismiss,
            saveInstitution,
            deleteInstitution,
        };
    },
});
</script>

<style scoped>
.modal-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.form-container {
    padding: 2.0em;
  width: 100%;
  max-width: 5000px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form-item {
  width: 100%;
  max-width: 400px;
  margin: 5px 0; /* Diminuindo o espaçamento vertical */
}

ion-item.form-item {
  --inner-padding-start: 8px; /* Ajustando o padding interno */
  --inner-padding-end: 8px;
  --border-radius: 10px; /* Borda arredondada */
  --padding-bottom: 8px;
  --padding-top: 8px;
}

ion-button {
  margin-top: 15px; /* Diminuindo o espaçamento vertical */
  width: 100%;
  max-width: 400px;
  --border-radius: 10px; /* Borda arredondada */
}

.searchbar {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  --border-radius: 10px; /* Borda arredondada */
}
</style>



