<template>
  <section class="plant">
    <img :src="plant.image_url" alt="plant" />
    <div class="plant-informations">
      <RouterLink to="/plants" class="back-button">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
      </RouterLink>
      <h1 class="plant-name-title">{{ plant.common_name }}</h1>
      <div class="specifications">
        <div class="box">
          <p class="title">Nom scientifique</p>
          <p>{{ plant.scientific_name }}</p>
        </div>
        <div class="box">
          <p class="title">Famille</p>
          <p>{{ plant.family }}</p>
        </div>
        <div class="box">
          <p class="title">Dépôt du nom</p>
          <p>{{ plant.year }}</p>
        </div>
        <div class="box">
          <p class="title">Gènes</p>
          <p>{{ plant.genus }}</p>
        </div>
        <div class="box">
          <p class="title">Bibliographie</p>
          <p>{{ plant.bibliography }}</p>
        </div>
        <div class="box">
          <p class="title">Autheur</p>
          <p>{{ plant.author }}</p>
        </div>
      </div>
      <div class="actions">
        <button @click="deletePlant()" class="delete-plant-button">
          Supprimer la plante
        </button>
        <router-link :to="`/plants/edit/${plant.id}`">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
          </svg>
        </router-link>
      </div>
      <!-- <p v-for="synonym in plant.synonyms">
        {{ synonym }}
      </p> -->
    </div>
  </section>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import Swal from 'sweetalert2';

const router = useRouter();

const plant = ref({});

onMounted(async () => {
  const route = useRoute()
  const id = route.params.id
  const response = await fetch(`http://localhost:8000/plants/${id}`);
  plant.value = await response.json();
});

async function deletePlant() {
  Swal.fire({
    title: "Êtes-vous sûr de vouloir supprimer cette plante ?",
    showDenyButton: true,
    confirmButtonText: "Supprimez",
    confirmButtonColor: "#F8333C", // Changer la couleur ici
    denyButtonText: `Annulez`,
    denyButtonColor: "#2E2E2E",
  }).then(async (result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      let deletePlant = await fetch(`http://localhost:8000/plants/${plant.value.id}`, {
        method: 'DELETE',
      });

      deletePlant = await deletePlant.json();
      if (deletePlant.message === "Plant deleted") {
        Swal.fire({
          icon: "success",
          title: "Plante supprimée !",
          showConfirmButton: false,
          timer: 1500
        });
        setTimeout(() => {
          router.push('/plants');
        }, 2000);
      }
    }
  });

}

</script>

<style scoped>
section {
  padding: 0;
  display: flex;
  max-height: 90dvh;
  /* Pour la barre */
  height: calc(90dvh - 2px);
}

.back-button {
  position: absolute;
  top: 2rem;
  height: 2.5rem;
  width: 2.5rem;
  padding: 0.5rem;
  background: #10552D;
  border-radius: 100%;
}

.plant {
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: space-between;
}

.actions {
  display: flex;
  flex-direction: row;
  gap: 2rem;
  margin-top: 2rem;
  width: 100%;
  justify-content: space-between;
}

.actions>* {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.actions a,
.actions button {
  min-height: 3rem;
  min-width: 3rem;
  width: fit-content;
}

.actions a {
  background-color: #10552D;
  border-radius: 5px;
}

.actions a svg {
  height: 60%;
}

.plant img {
  height: 100%;
  width: 40%;
  object-fit: cover;
}

.plant-informations {
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: #002917;
  width: 100%;
  height: 100%;
  padding: 6rem 2rem;
}

.plant-name-title {
  text-transform: capitalize;
}

.plant-informations p {
  font-family: system-ui;
  font-weight: lighter;
}

.plant-informations h1 {
  color: #DADDD8;
  font-size: 2rem;
  font-family: "Playfair Display", serif;
  margin-bottom: 1rem;
  height: fit-content;
  width: 100%;
  font-weight: 700;
}

.specifications {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 2rem;
}

.box {
  background-color: #DADDD8;
  width: fit-content;
  padding: 1rem 2rem;
  border-radius: 5px;
  margin-bottom: 1rem;
  width: calc(50% - 0.5rem);
}

.box .title {
  font-weight: 600;
  font-size: 1.2rem;
}

.delete-plant-button {
  padding: 1rem 2rem;
  outline: none;
  border: none;
  /* background-color: #E3170A; */
  background-color: #F8333C;
  border-radius: 5px;
  color: #DADDD8;
  font-weight: 700;
  cursor: pointer;
}

.delete-plant-button:hover {
  background-color: #ff1a26;
}
</style>
