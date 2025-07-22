<template>
  <div class="section">
    <v-container>
      <v-row class="pa-6">
        <v-col cols="12">
          <h1>Today's Top Picks</h1>
        </v-col>
      </v-row>
      <v-row dense>
        <v-col cols="12" justify-center lg="4" md="12" xl="4">
          <v-card class="featured-card featured-card-1" height="476">
            <v-img
              class="hover"
              cover
              height="100%"
              src="@/assets/images/Hemingway/Hemingway.jpg"
            />
            <div class="overlay-text">
              <h3 class="text-h5 mb-1">Step Into Hemingway’s European Hangouts</h3>
              <h4 class="text-caption">
                You can't get away from yourself by moving from one place to another.
              </h4>
            </div>
          </v-card>
        </v-col>
        <v-col cols="12" lg="8" md="12" xl="8">
          <v-row dense>
            <v-col cols="6" lg="8" md="6" xl="8">
              <v-card class="featured-card featured-card-2" :height="height">
                <v-img class="hover" cover height="100%" :src="cards[0].image" />
                <div class="overlay-text">
                  <h3 class="text-h5 mb-1">{{ cards[0].title }}</h3>
                  <h4 class="text-caption">{{ cards[0].caption }}</h4>
                </div>
              </v-card>
            </v-col>
            <v-col cols="6" lg="4" md="6" xl="4">
              <v-card class="featured-card featured-card-3" :height="height">
                <v-img class="hover" cover height="100%" :src="cards[1].image" />
                <div class="overlay-text">
                  <h3 class="text-h5 mb-1">{{ cards[1].title }}</h3>
                  <h4 class="text-caption">{{ cards[1].caption }}</h4>
                </div>
              </v-card>
            </v-col>
          </v-row>
          <v-row dense>
            <v-col cols="6" lg="4" md="6" xl="4">
              <v-card class="featured-card featured-card-4" :height="height">
                <v-img class="hover" cover height="100%" :src="cards[2].image" />
                <div class="overlay-text">
                  <h3 class="text-h5 mb-1">{{ cards[2].title }}</h3>
                  <h4 class="text-caption">{{ cards[2].caption }}</h4>
                </div>
              </v-card>
            </v-col>
            <v-col cols="6" lg="8" md="6" xl="8">
              <v-card class="featured-card featured-card-5" :height="height">
                <v-img class="hover" cover height="100%" :src="cards[3].image" />
                <div class="overlay-text">
                  <h3 class="text-h5 mb-1">{{ cards[3].title }}</h3>
                  <h4 class="text-caption">{{ cards[3].caption }}</h4>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { computed, onMounted } from 'vue'
import { useDisplay } from 'vuetify'

gsap.registerPlugin(ScrollTrigger)

const { name } = useDisplay()

const cards = [
  {
    title: 'Get to Know Diego Rivera',
    caption: 'The husband of Mexican icon Frida Kahlo',
    image: new URL('@/assets/images/Hemingway/1.jpg', import.meta.url).href,
  },
  {
    title: 'The Historic City of Bagerhat',
    caption: 'Take a tour around its splendid domes',
    image: new URL('@/assets/images/Hemingway/2.jpg', import.meta.url).href,
  },
  {
    title: 'Engineer the Future with Pissarro',
    caption: 'With the Museum of Engineering Innovation',
    image: new URL('@/assets/images/Hemingway/3.jpg', import.meta.url).href,
  },
  {
    title: 'What is Love?',
    caption: 'With Kunsthalle Bremen',
    image: new URL('@/assets/images/Hemingway/4.jpg', import.meta.url).href,
  },
]

const height = computed(() => {
  switch (name.value) {
    case 'xs': {
      return 300
    }
    case 'sm': {
      return 300
    }
    case 'md': {
      return 300
    }
    case 'lg': {
      return 234
    }
    case 'xl': {
      return 234
    }
  }

  return 234
})

onMounted(() => {
  gsap.from('.featured-card-1', {
    x: -300,
    opacity: 0,
    duration: 3,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.featured-card-1',
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
  })

  gsap.from('.featured-card-2', {
    y: 100,
    opacity: 0,
    duration: 3,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.featured-card-2',
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
  })

  gsap.from('.featured-card-3', {
    x: 100,
    opacity: 0,
    duration: 3,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.featured-card-3',
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
  })

  gsap.from('.featured-card-4', {
    x: -100,
    opacity: 0,
    duration: 3,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.featured-card-4',
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
  })

  gsap.from('.featured-card-5', {
    y: 100,
    opacity: 0,
    duration: 3,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.featured-card-5',
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
  })
})
</script>

<style scoped>
.section {
  min-height: 640px;
  max-width: 1200px;
  margin: 0 auto 48px auto;
  overflow: hidden;
  position: relative;
  box-sizing: border-box;
}

.featured-card .overlay-text {
  position: absolute;
  bottom: 0;
  color: white;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.6), transparent);
  width: 100%;
  padding: 12px;
  font-family: 'Google Sans', 'Noto Naskh Arabic UI', Arial, sans-serif;
}

h1 {
  font-family: 'Google Sans', 'Noto Naskh Arabic UI', Arial, sans-serif;
  line-height: 2.75rem;
  font-size: 2.25rem;
  letter-spacing: 0;
  font-weight: 400;
  text-align: center;
}

.hover {
  transition: transform 0.5s ease;
  cursor: pointer;
}

.hover:hover {
  transform: scale(1.1);
}
</style>
