<template>
  <v-container class="pa-0" fluid>
    <v-row>
      <v-col class="pa-6" cols="12">
        <h1>Meet the most iconic French film magazine</h1>
      </v-col>
    </v-row>
    <v-row class="bg">
      <v-col cols="2" />
      <v-col cols="12" lg="8" md="8" sm="12" xl="8" xs="12">
        <div class="swiper">
          <div class="swiper-wrapper">
            <div v-for="(card, idx) in cards" :key="idx" align="center" class="swiper-slide">
              <v-img cover height="100%" rounded="lg" :src="card.image" />
              <div class="overlay-text">
                <h2>{{ card.title }}</h2>
                <h3>{{ card.caption }}</h3>
              </div>
            </div>
          </div>
          <div class="swiper-button-prev"><!-- --></div>
          <div class="swiper-button-next"><!-- --></div>
          <div class="swiper-scrollbar"><!-- --></div>
          <div class="swiper-pagination"><!-- --></div>
        </div>
        <v-btn class="mt-5" color="primary">What is Cahiers du cinéma?</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import Swiper from 'swiper'
import { Navigation, Pagination, Scrollbar } from 'swiper/modules'
import { onMounted } from 'vue'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

onMounted(() => {
  const swiper = new Swiper('.swiper', {
    modules: [Navigation, Scrollbar, Pagination],
    direction: 'horizontal',
    loop: false,

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    pagination: {
      el: '.swiper-pagination',
      type: 'progressbar',
    },

    scrollbar: {
      el: '.swiper-scrollbar',
    },
  })
})

const cards = [
  {
    title: '5 Moments in Film History Told Through Cahiers',
    caption: 'Recording movie magic for over 70 years',
    image: new URL('@/assets/images/movies/blackandwhite.jpg', import.meta.url).href,
  },
  {
    title: '',
    caption:
      'Cahiers du cinéma is one of the oldest film magazines in history, with its first issue released in 1951. From movie reviews to discussions on the changing landscape of cinema, Cahiers revolutionized how film was documented through its pages. Lets take a quick look at cinema history through the magazine archive...',
    image: new URL('@/assets/images/movies/2.jpg', import.meta.url).href,
  },
  {
    title: '1. The evolution of color film',
    caption:
      'The origins of filmmaking goes back to the late 19th century, with black and white images used for many years until the invention of color photography in the early 20th century. The beginning of Cahiers saw color film establish itself and eventually become dominant in cinema, and it was in the 1954 special issue that the magazines first color photograph was published.',
    image: new URL('@/assets/images/movies/3.jpg', import.meta.url).href,
  },
  {
    title: '2. From movies to TV',
    caption:
      'The rise of television in the 1950s revolutionized the film industry and redefined traditional forms of entertainment. Film review and cinema gradually embraced the television format, and in 2010, a TV series was named top film of the decade for the first time: David Lynchs Twin Peaks Season 3.',
    image: new URL('@/assets/images/movies/4.jpg', import.meta.url).href,
  },
  {
    title: '3. Famous faces',
    caption:
      'As cinema became more popular through the decades, so did the famous faces. Cahiers has always shone a light on the biggest and brightest stars in the industry, from actors to directors and even celebrated characters, like Spider-Man',
    image: new URL('@/assets/images/movies/5.jpg', import.meta.url).href,
  },
  {
    title: '4. Fashion on the big screen',
    caption:
      'Fashion and cinema have always been linked. Since the birth of film, the biggest fashion and costume designers in the world have dressed actors. Some collaborations and costumes have become legendary, like Director Wes Anderson becoming known for iconic fashion moments in his films.',
    image: new URL('@/assets/images/movies/6.jpg', import.meta.url).href,
  },
  {
    title: '5. The rise of digital media',
    caption:
      'If one thing characterizes Cahiers , its their consistent desire to evolve with the times. This 2016 issue explored contemporary changes in our relationship with screens and, more broadly, with images. From video games to social media to reality television, Cahiers has always looked beyond cinema toward emerging new forms of creation and storytelling.',
    image: new URL('@/assets/images/movies/7.jpg', import.meta.url).href,
  },
]
</script>

<style scoped>
v-container {
  user-select: none;
}
.swiper {
  width: 100%;
  height: 640px;
  margin-top: 60px;
}

h1 {
  font-family: 'Google Sans', 'Noto Naskh Arabic UI', Arial, sans-serif;
  letter-spacing: 0;
  font-weight: 400;
  line-height: 2.75rem;
  font-size: 2.25rem;
  color: rgb(32, 33, 36);
  text-align: center;
}
.bg {
  background: url('@/assets/images/movies/blackandwhite.jpg') no-repeat center/cover;
  text-align: center;
  padding-bottom: 50px;
}

.btn {
  background: #0d652d;
  color: white;
}

.overlay-text {
  position: absolute;
  bottom: 0;
  color: white;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.6), transparent);
  width: 100%;
  padding: 30px;
  font-family: 'Google Sans', 'Noto Naskh Arabic UI', Arial, sans-serif;
  text-align: left;
  border-radius: 30px;
}

h2 {
  line-height: 2.25rem;
  font-size: 1.75rem;
  letter-spacing: 0;
  font-weight: 500;
  width: 60%;
}

h3 {
  line-height: 1.75rem;
  font-size: 1.375rem;
  letter-spacing: 0;
  font-weight: 400;
  width: 60%;
}
.swiper-button-next,
.swiper-button-prev {
  --swiper-navigation-color: transparent;
  --swiper-navigation-size: 650px;
}

@media (max-width: 960px) {
  .swiper-button-next,
  .swiper-button-prev {
    --swiper-navigation-color: transparent;
    --swiper-navigation-size: 100px;
  }
  h2 {
    font-size: 1.3rem;
    width: 80%;
  }
  h3 {
    font-size: 1.1rem;
    width: 80%;
  }
}

.swiper-pagination {
  --swiper-pagination-top: 10%;
  --swiper-pagination-color: white;
  --swiper-pagination-progressbar-bg-color: rgba(37, 33, 33, 0.25);
}
</style>
