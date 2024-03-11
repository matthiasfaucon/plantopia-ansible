<template>
    <section>
        <div class="container-img-text">
            <div class="container-text">
                <h1>Bienvenue dans Plantopia - Cultivez votre savoir.</h1>
                <p>Plantopia est la référence en ligne pour découvrir, apprendre et partager votre passion pour les
                    plantes.
                </p>
                <RouterLink to="/plants" class="button">Découvrir les plantes</RouterLink>
            </div>
            <!-- <img src="@/assets/top2.png" alt="plante" class="top-plant-img"> -->
            <!-- <img src="@/assets/decoration2.png" alt="plante" class="decoration-img-2"> -->
            <!-- <img src="@/assets/accueil2.png" alt="plante" class="big-plant-img"> -->
            <img src="@/assets/accueil4.png" alt="plante" class="big-plant-img">
            <!-- <img src="@/assets/top.png" alt="plante" class="bottom-plant-img"> -->
        </div>
    </section>
</template>

<script setup>
</script>

<style scoped>
section {
    max-height: 90dvh;
    height: calc(90dvh - 2px);
}

.container-img-text {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    gap: 2rem;
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
}

.container-text {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    font-family: system-ui;
    font-weight: lighter;
    width: 40%;
    margin: 2rem 0 0 5rem;
    z-index: 10;
}

.container-text h1 {
    color: #10552D;
    font-size: 2rem;
    font-family: "Playfair Display", serif;
}

.button {
    width: fit-content;
}

.container-img-text img {
    position: absolute;

}

.container-img-text img.big-plant-img {
    width: 40rem;
    right: 7rem;
    bottom: -5rem;
    filter: saturate(1);
}

.container-img-text img.decoration-img-2 {
    width: 17rem;
    left: -1rem;
    top: -1rem;
    filter: saturate(0.7);
    transform: rotate(-10deg);
}

.container-img-text img.top-plant-img {
    top: -32rem;
    transform: scale(1.3);
    left: 2rem;
    filter: saturate(1.5);
}

.container-img-text img.bottom-plant-img {
    bottom: -24rem;
    right: 6rem;
    filter: saturate(1.3);
    transform: scale(1.3);
}
</style>