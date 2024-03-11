<template>
    <section class="contact">
        <div class="info-contact">
            <hr>
            <h1>Ajouter une plante</h1>
            <p>Notre site étant communautaire, certaines plantes peuvent ne pas être encore renseignée. Si c'est le cas
                et que vous avez les informations nécesssaires à l'ajout de la plante, vous pouvez la rajouter !</p>

            <img src="@/assets/deco-top-add-plant.png" alt="feuilles" class="img1" />
            <img src="@/assets/deco-bottom-add-plant.png" alt="fleur" class="img2" />
        </div>
        <div class="contact-form">
            <img src="@/assets/deco-add-plant.png" alt="déco" class="img-deco" />
            <div class="container-form">
                <form v-if="!isLoading" @submit.prevent="addPlant">
                    <!-- Ajouter une image -->
                    <div class="plant-names">
                        <div class="form-group">
                            <label for="scientific_name">Nom scientifique</label>
                            <input type="text" id="scientific_name" v-model="plant.scientific_name" />
                        </div>
                        <div class="form-group">
                            <label for="common_name">Nom commun</label>
                            <input type="text" id="common_name" v-model="plant.common_name" />
                        </div>
                    </div>
                    <div class="family-genus">

                        <div class="form-group">
                            <label for="family">Famille</label>
                            <input type="text" id="family" v-model="plant.family" />
                        </div>
                        <div class="form-group">
                            <label for="genus">Genre</label>
                            <select name="genus" id="genus" v-model="plant.genusTab">
                                <option value="">Choisir un genre</option>
                                <option v-for="genus in genusTab" :key="genus" :value="genus">
                                    {{ genus.name }}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="year">Dépôt du nom</label>
                        <input type="number" id="year" v-model="plant.year" />
                    </div>

                    <div class="form-group">
                        <label for="bibliography">Bibliographie</label>
                        <input type="text" id="bibliography" v-model="plant.bibliography" />
                    </div>
                    <div class="form-group">
                        <label for="author">Autheur</label>
                        <input type="text" id="author" v-model="plant.author" />
                    </div>
                    <div class="form-group">
                        <label for="image">Image</label>
                        <input type="file" id="image" @change="handleImageChange" />
                    </div>
                    <input type="submit" value="Ajouter la plante"></input>
                </form>
            </div>
        </div>

    </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const plant = ref({
    common_name: '',
    scientific_name: '',
    family: '',
    year: 1924,
    genusTab: '',
    bibliography: '',
    image_url: ''
})

const isLoading = ref(true);

async function addPlant() {
    let response = await fetch('http://localhost:8000/plants', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(plant.value),
    });
    response = await response.json();
    // Use `router` instead of `this.$router`
    router.push('/plants');

}

const genusTab = ref([]);

onMounted(async () => {
    let response = await fetch('http://localhost:8000/genus');
    response = await response.json();
    genusTab.value = response;
    isLoading.value = false;

});

function handleImageChange(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
        plant.value.image_url = e.target.result;
    };
    reader.readAsDataURL(file);
}
</script>

<style scoped>
section {
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    padding: 0;
    height: calc(90dvh - 2px);
}

.plant-names,
.family-genus {
    display: flex;
    width: 100%;
    gap: 1rem;
}

.plant-names div,
.family-genus div {
    width: 50%;
}

.container-form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    width: 70%;
    padding: 2rem 2rem;
    border-radius: 5px;
    background-color: #DADDD8;
}

.info-contact {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 40%;
    height: 100%;
    padding: 5rem 2rem;
    position: relative;
    overflow: hidden;
    justify-content: center;
}

.info-contact hr {
    width: 100%;
    height: 2px;
    background-color: #A7D5AF;
    border: none;
}

.info-contact h1 {
    font-size: 3rem;
    color: #10552D;
}

.info-contact p {
    color: #10552D;
    font-size: 1.1rem;
}

.info-contact img {
    position: absolute;
    /* Changer la saturation */
    filter: saturate(0.6);
}

.info-contact img.img1 {
    top: -10rem;
    right: -10rem;
    width: 30rem;
    transform: rotate(-10deg);
}

.info-contact img.img2 {
    bottom: -12rem;
    left: -15rem;
    width: 40rem;
}

.contact-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 60%;
    height: 100%;
    background: #10552D;
    justify-content: center;
    position: relative;
    overflow: hidden;
    z-index: 1;
}

.contact-form img.img-deco {
    z-index: -1;
    position: absolute;
    width: 15rem;
    top: -10rem;
    left: 0;
    transform: rotate(-20deg);
    filter: saturate(0.8);
}

form {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

label {
    font-size: 0.9rem;
    font-weight: 300;
}

input[type="submit"] {
    background-color: #10552D;
    box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.12) 0px 1px 1px 0px, #10552D 0px 0px 0px 1px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(60, 66, 87, 0.08) 0px 2px 5px 0px;
    color: #DADDD8;
    font-weight: 600;
    cursor: pointer;
}

input[type="submit"]:hover {
    background-color: #0A3A1A;
}
</style>