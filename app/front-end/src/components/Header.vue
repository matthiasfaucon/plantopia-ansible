<template>
    <header>

        <RouterLink to="/" exact>
            <h1>
                Plantopia
            </h1>
        </RouterLink>
        <nav>
            <RouterLink to="/" exact>Accueil</RouterLink>
            <RouterLink to="/plants">Plantes</RouterLink>
            <RouterLink to="/contact">Contact</RouterLink>
        </nav>
    </header>
    <hr />
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'

</script>

<style scoped>
header {
    height: 10dvh;
    display: flex;
    /* background-color: red; */
    align-items: center;
    padding: 0 2rem;
}

header nav {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
}

header h1 {
    color: #10552D;
    font-weight: bold;
    font-weight: 900;
    font-size: 1.5rem;
}

header a {
    color: #10552D;
    font-family: "Playfair Display", serif;
    font-weight: bold;
    font-weight: 900;
    font-size: 1.2rem;
}

hr {
    width: 100%;
    border: #10552D 1px solid;
}
</style>