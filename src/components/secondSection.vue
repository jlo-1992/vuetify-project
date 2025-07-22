<template>
  <div class="bg">
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <h1>Dive into...</h1>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="1" lg="2" md="2" sm="0" xl="2" xs="0" />
        <v-col cols="10" lg="8" md="8" sm="12" xl="8" xs="12">
          <v-img id="bigimg" cover rounded="lg" src="@/assets/images/aquarium/big.jpg" />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <a v-for="(card, idx) in cards" :key="idx" class="card">
            <v-card
              :alt="card.caption"
              height="100%"
              style="background: transparent; box-shadow: none; overflow: hidden"
            >
              <div class="img-wrapper">
                <a
                  data-lightbox="aqua"
                  :data-title="card.caption"
                  :href="card.image"
                  :title="card.caption"
                >
                  <v-img class="img" cover :src="card.image"
                /></a>
              </div>
              <p>{{ card.title }}</p>
              <h4>{{ card.caption }}</h4>
            </v-card>
          </a>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import lightbox from 'lightbox2'
import { computed } from 'vue'
import 'lightbox2/dist/css/lightbox.min.css'

lightbox.option({
  resizeDuration: 200,
  wrapAround: true,
})

const cards = [
  {
    title: '主題',
    caption: 'The Invisible Forest',
    image: new URL('@/assets/images/aquarium/1.jpg', import.meta.url).href,
  },
  {
    title: '線上展覽',
    caption: 'The Invisible Forest',
    image: new URL('@/assets/images/aquarium/2.jpg', import.meta.url).href,
  },
  {
    title: 'EXPIRIMENTS',
    caption: 'Calling in Our Corals',
    image: new URL('@/assets/images/aquarium/3.jpg', import.meta.url).href,
  },
]
</script>

<style scoped>
h1 {
  font-family: 'Google Sans', 'Noto Naskh Arabic UI', Arial, sans-serif;
  letter-spacing: 0;
  font-weight: 400;
  line-height: 2.75rem;
  font-size: 2.25rem;
  color: rgb(32, 33, 36);
}
.bg {
  height: 100%;
  background: url('@/assets/images/aquarium/bg.jpg');
  text-align: center;
}

#bigimg {
  width: 100%;
  height: 640px;
}

.card {
  text-decoration: none;
  text-align: left;
  padding: 0;
  margin: 0;
  width: 389.33px;
  display: inline-block;
  background: transparent;

  .img-wrapper {
    overflow: hidden;

    .img {
      border-radius: 10px;
      transition: transform 0.5s ease;
      cursor: pointer;
    }

    .img:hover {
      transform: scale(1.2);
    }
  }
  p {
    color: rgb(26, 115, 232);
  }

  h4 {
    font-family: 'Google Sans', 'Noto Naskh Arabic UI', Arial, sans-serif;
    color: rgb(60, 64, 67);
  }
}
</style>
