<template>
  <div>
    <v-container class="bg" fluid>
      <v-row>
        <v-col cols="12">
          <h1 id="title-word" class="text-center">What do you want explore?</h1>
        </v-col>
        <v-col cols="1" lg="2" md="2" sm="0" xl="2" xs="0" />
        <v-col class="image-row" cols="12" lg="8" md="8" sm="12" xl="8" xs="12">
          <div v-for="(card, idx) in cards" :key="idx" class="block hover-z">
            <a href="#" :style="{ height: heightBlock + 'px' }">
              <v-img class="hover" cover height="100%" :src="card.image" />
              <div class="overlay-text">
                <h4>{{ card.caption }}</h4>
              </div>
            </a>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
const cards = [
  {
    image: new URL('@/assets/images/paintings/1.jpg', import.meta.url).href,
    caption: 'City View',
  },
  {
    image: new URL('@/assets/images/paintings/2.jpg', import.meta.url).href,
    caption: 'Beach House',
  },
  {
    image: new URL('@/assets/images/paintings/3.jpg', import.meta.url).href,
    caption: 'Castle',
  },
  {
    image: new URL('@/assets/images/paintings/4.jpg', import.meta.url).href,
    caption: 'Alpine Retreat',
  },
]
</script>

<style scoped>
.bg {
  font-family: 'Google Sans', 'Noto Naskh Arabic UI', Arial, sans-serif;
  height: 100%;
  padding-bottom: 100px;
}

.image-row {
  display: flex;
  flex-wrap: nowrap;
}

#title-word {
  letter-spacing: 0;
  font-weight: 400;
  line-height: 2.75rem;
  font-size: 2.25rem;
}

.block {
  flex: 3 1 75%;
  color: white;
  font-size: 100px;
  text-align: center;
  height: 450px;
  border-radius: 10px;
  position: relative;
  overflow: hidden;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.3);
  cursor: pointer;
}

.overlay-text {
  position: absolute;
  bottom: 0;
  color: white;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.6), transparent);
  width: 100%;
  padding: 12px;
  font-size: 22px;
}

.hover {
  transition: transform 0.5s ease;
  cursor: pointer;
}

.hover:hover {
  transform: scale(1.1);
}

h4 {
  font-size: 22px;
  text-align: left;
}

.hover-z:hover {
  z-index: 1;
}
</style>
