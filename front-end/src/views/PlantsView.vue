<template>
  <section class="plants">
    <div class="container-title-button-add">
      <h1>Liste des plantes</h1>
      <router-link to="/plants/add">Ajouter une plante</router-link>
    </div>
    <div v-if="!isLoading" class="container-filter-list">
      <!-- Filtres -->
      <div class="filters">
        <input type="text" v-model="filter.common_name" placeholder="Rechercher une plante" />
        <hr />
        <label for="genus">Gènes</label>
        <select name="genus" id="genus" v-model="filter.genus">
          <option value="">Tous les gènes</option>
          <option v-for="genus in genusTab" :key="genus.id" :value="genus.id">
            {{ genus.name }}
          </option>
        </select>
      </div>


      <div class="plants-list">
        <PlantCard v-for="plant in plants" :key="plant.id" :plant="plant" />
      </div>
    </div>


    <!-- Pagination -->
    <div v-if="!isLoading" class="pagination">
      <button v-if="totalPages > 1" :disabled="currentPage === 1" @click="previousPage">Précédent</button>
      <span>{{ currentPage }}</span>
      <button v-if="totalPages > 1" :disabled="currentPage === totalPages" @click="nextPage">Suivant</button>
    </div>

    <div class="wait-search" v-else>
      <p>Chargement des plantes et des filtres...</p>
    </div>
  </section>
</template>

<script setup>
import PlantCard from '@/components/PlantCard.vue';
import { onMounted, ref, reactive, computed, watch } from 'vue';

const plants = ref([]);
const currentPage = ref(1);
const totalPages = ref(1);
const genusTab = ref([]);
const isLoading = ref(true);
const filter = reactive({
  common_name: '',
  genus: '',
});

onMounted(async () => {
  let response = await fetch('http://localhost:8000/plants');
  let genus = await fetch('http://localhost:8000/genus');
  response = await response.json();
  genus = await genus.json();
  console.log(genus);
  plants.value = await response.data;
  totalPages.value = response.totalPages;
  genusTab.value = genus;
  isLoading.value = false;
});


function previousPage() {
  currentPage.value--;
}

function nextPage() {
  currentPage.value++;
}

watch(filter, async () => {
  let response = await fetch('http://localhost:8000/plants?page=1' + [...Object.entries(filter)].map(([key, value]) => `&${key}=${value}`).join(''));
  response = await response.json();
  plants.value = await response.data;
  totalPages.value = response.totalPages;
  currentPage.value = 1;
});

watch(currentPage, async () => {
  let response = await fetch('http://localhost:8000/plants?page=' + currentPage.value + [...Object.entries(filter)].map(([key, value]) => `&${key}=${value}`).join(''));
  response = await response.json();
  plants.value = await response.data;
  totalPages.value = response.totalPages;
});

</script>

<style scoped>
section {
  margin-top: 1rem;
  flex-direction: column;
  padding: 0 2rem 2rem 2rem;
}

.container-title-button-add {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  margin-left: 15%;
}

.container-title-button-add a {
  padding: 0.5rem 1rem;
  background-color: #10552D;
  border-radius: 7px;
  color: white;
  text-decoration: none;
  font-weight: 700;
}

.container-filter-list {
  margin-top: 2rem;
  display: flex;
  gap: 1rem;
}

.filters {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 15%;
}

.filters label {
  font-size: 0.9rem;
  color: #10552D;
  font-weight: 500;
}

.filters hr {
  background-color: #10552D;
}

.plants h1 {
  font-size: 1.5rem;
  color: #10552D;
  padding: 1rem;
  text-align: center;
  font-weight: 900;
  font-size: 2rem;
}

.plants-list {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  width: 85%;
  height: 100%;
  gap: 1rem;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
}

.pagination button {
  padding: 0.5rem 1rem;
  background-color: #10552D;
  color: white;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
}

.pagination button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.filters input[type="text"] {
  font-size: 0.9rem;
}

.wait-search {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #10552D;
  height: 75dvh;
}

.wait-search p {
  font-size: 1.5rem;
  font-weight: 700;
  font-family: "Playfair Display", serif;
}
</style>
