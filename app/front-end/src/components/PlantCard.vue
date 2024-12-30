<template>
    <RouterLink :to="{ name: 'plant-details', params: { id: plant.id } }" class="plant-card">
        <img :src="plant.image_url" alt="plant" />
        <div class="plant-informations">
            <h2>{{ plant.common_name }}</h2>
            <div class="plant-actions">
                <router-link :to="`/plants/edit/${plant.id}`">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>
                </router-link>

                <svg enable-background="new 0 0 32 32" id="Слой_1" version="1.1" viewBox="0 0 32 32"
                    xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <path clip-rule="evenodd"
                        d="M32,16.009c0-0.267-0.11-0.522-0.293-0.714  l-9.899-9.999c-0.391-0.395-1.024-0.394-1.414,0c-0.391,0.394-0.391,1.034,0,1.428l8.193,8.275H1c-0.552,0-1,0.452-1,1.01  s0.448,1.01,1,1.01h27.586l-8.192,8.275c-0.391,0.394-0.39,1.034,0,1.428c0.391,0.394,1.024,0.394,1.414,0l9.899-9.999  C31.894,16.534,31.997,16.274,32,16.009z"
                        fill="#121313" fill-rule="evenodd" id="Arrow_Forward"></path>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                </svg>
            </div>
        </div>
    </RouterLink>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import { defineProps } from 'vue';

const props = defineProps({
    plant: Object,
});
</script>

<style scoped>
.family {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.8rem;
}

.plant-informations {
    display: flex;
    flex-direction: column;
    width: 60%;
    color: rgb(14, 15, 14);
    padding: 1rem;
    justify-content: space-between;
}

.plant-informations h2 {
    font-size: 1.3rem;
    font-family: 'Playfair Display', serif;
    margin-bottom: 1rem;
    height: fit-content;
    width: 100%;
    font-weight: 700;
    color: #10552D;
}

.plant-actions {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    width: 100%;
}

.plant-actions svg {
    display: flex;
    width: 20px;
    height: 20px;
    align-self: self-end;
    z-index: 10;
}

.plant-actions>svg path {
    fill: #A7D5AF;
}

.plant-actions a svg:first-of-type path {
    stroke: #BE6E46;
}

.plant-card {
    display: flex;
    justify-content: center;
    width: calc(100% / 3 - 2rem / 3);
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    height: 8rem;

}

.plant-card img {
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    height: 100%;
    object-fit: cover;
    width: 40%;
}
</style>