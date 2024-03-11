<template>
  <section class="plant">
    <img :src="plant.image_url" alt="plant" />
    <div class="plant-informations">
      <h1>{{ plant.common_name }}</h1>
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
      <div>
        <button @click="deletePlant()" class="delete-plant-button">
          Supprimer la plante
        </button>
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
  console.log(plant.value);
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
      console.log(deletePlant);

      deletePlant = await deletePlant.json();
      if (deletePlant.message === "Plant deleted") {
        console.log("Plant deleted");
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

.plant {
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: space-between;
}

.plant img {
  height: 100%;
  width: 40%;
  object-fit: cover;
}

.plant-informations {
  display: flex;
  flex-direction: column;
  background-color: #002917;
  width: 100%;
  height: 100%;
  padding: 5rem 2rem;
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
  width: calc(50% - 1rem);
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
  margin-top: 2rem;
  cursor: pointer;
}
</style>
