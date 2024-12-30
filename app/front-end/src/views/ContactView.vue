<template>
    <section class="contact">
        <div class="info-contact">
            <hr>
            <h1>Contact</h1>
            <p>Vous avez une question ? Vous souhaitez nous faire part de vos commentaires ? N'hésitez pas à nous
                contacter !</p>

            <img src="@/assets/feuilles.png" alt="feuilles" class="img1" />
            <img src="@/assets/fleur.png" alt="fleur" class="img2" />
        </div>
        <div class="contact-form">
            <img src="@/assets/decoration.png" alt="déco" class="img-deco" />
            <div class="container-form">
                <form @submit.prevent="sendEmail">
                    <div class="form-group">
                        <label for="name">Nom</label>
                        <input type="text" id="name" name="name" v-model="name" placeholder="Dupont" />
                    </div>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" id="email" name="email" v-model="email" placeholder="test.test@test.fr" />
                    </div>
                    <div class="form-group">
                        <label for="subject">Sujet du mail</label>
                        <input type="text" id="subject" name="subject" v-model="subject"
                            placeholder="Resencement d'une plante rare" />
                    </div>
                    <div class="form-group">
                        <label for="message">Message</label>
                        <textarea id="message" name="message" v-model="message"
                            placeholder="Je vous contacte..."></textarea>
                    </div>
                    <input type="submit"></input>
                </form>
            </div>
        </div>

    </section>
</template>

<script setup>

import { ref } from 'vue';
import Swal from 'sweetalert2';
import { useRouter } from 'vue-router';

const router = useRouter();

const name = ref('');
const email = ref('');
const message = ref('');
const subject = ref('');

const sendEmail = () => {

    fetch('http://localhost:8001/api/contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: name.value,
            email: email.value,
            message: message.value,
            subject: subject.value,
        }),
    });
    Swal.fire({
        title: "Message envoyé !",
        text: "Nous vous répondrons dans les plus brefs délais.",
        icon: "success",
        willClose: () => {
            router.push('/');
        }
    });
}

</script>

<style scoped>
section {
    display: flex;
    align-items: center;
    padding: 0;
    height: calc(90dvh - 2px);
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
    top: -5rem;
    right: -5rem;
    width: 20rem;
}

.info-contact img.img2 {
    bottom: -3rem;
    left: -5rem;
    width: 18rem;
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
}

.contact-form img.img-deco {
    position: absolute;
    top: -3rem;
    right: -2rem;
    width: 18rem;
    filter: saturate(0.8);
    transform: rotate(-35deg);
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
    font-size: 1.1rem;
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
