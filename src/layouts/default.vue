<template>
  <v-card>
    <v-layout>
      <v-app-bar style="position: fixed; z-index: 1">
        <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer" />
        <v-toolbar-title>Google culture</v-toolbar-title>
        <v-btn v-if="display.smAndDown.value" to="/">HOME PAGE</v-btn>
        <template v-for="item of navItems" v-else :key="item.to">
          <v-btn :to="item.to">{{ item.title }}</v-btn>
        </template>
        <v-btn prepend-icon="mdi-magnify" />
      </v-app-bar>

      <v-navigation-drawer
        v-model="drawer"
        absolute
        :location="$vuetify.display.mobile ? 'bottom' : undefined"
        :scrim="false"
        style="max-height: 100vh; position: fixed"
        temporary
      >
        <v-list>
          <v-btn id="menu" rounded="circle" @click="drawer = false">
            <v-icon icon="mdi-menu" size="large">mdi-menu</v-icon>
          </v-btn>
          <v-divider />
          <v-list-item v-for="(item, i) in items" :key="i" :value="item.value">
            <!-- 插槽 -->
            <template #prepend>
              <v-icon>{{ item.icon }}</v-icon>
            </template>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
        <v-divider />
        <div style="font-size: 0.75rem; padding: 16px">
          <a class="privacy" href="">隱私權</a> & <a class="privacy" href="">服務條款</a> •
          <a class="privacy" href="">生成式 AI 條款</a>
        </div>
      </v-navigation-drawer>
      <v-main>
        <v-container class="pa-0" fluid>
          <router-view />
        </v-container>
      </v-main>
    </v-layout>
  </v-card>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useDisplay } from 'vuetify'

const display = useDisplay()

const navItems = [
  { title: 'home page', to: '/' },
  { title: 'explore', to: '/explore' },
  { title: 'Play games', to: '/games' },
  { title: 'nearby', to: '/nearby' },
  { title: 'collect', to: '/collect' },
]

const items = [
  {
    title: '首頁',
    value: '首頁',
    icon: 'mdi-home-variant-outline',
  },
  {
    title: '探索',
    value: '探索',
    icon: 'mdi-compass',
  },
  {
    title: '玩遊戲',
    value: '玩遊戲',
    icon: 'mdi-play',
  },
  {
    title: '附近',
    value: '附近',
    icon: 'mdi-map-marker',
  },
  {
    title: '簡介',
    value: '簡介',
    icon: 'mdi-account-outline',
  },
  {
    title: '成就',
    value: '成就',
    icon: 'mdi-trophy-variant-outline',
  },
  {
    title: '系列作品',
    value: '系列作品',
    icon: 'mdi-bank-outline',
  },
  {
    title: '主題',
    value: '主題',
    icon: 'mdi-cellphone-sound',
  },
  {
    title: '實驗',
    value: '實驗',
    icon: 'mdi-flask-outline',
  },
  {
    title: '藝術家',
    value: '藝術家',
    icon: 'mdi-account-outline',
  },
  {
    title: '媒材',
    value: '媒材',
    icon: 'mdi-image',
  },
  {
    title: '藝術流派',
    value: '藝術流派',
    icon: 'mdi-brush',
  },
  {
    title: '歷史事件',
    value: '歷史事件',
    icon: 'mdi-clock',
  },
  {
    title: '歷史人物',
    value: '歷史人物',
    icon: 'mdi-account-outline',
  },
  {
    title: '地點',
    value: '地點',
    icon: 'mdi-map-marker',
  },
  {
    title: '關於',
    value: '關於',
    icon: 'mdi-information',
  },
  {
    title: '設定',
    value: '設定',
    icon: 'mdi-cog',
  },
  {
    title: '查看活動紀錄',
    value: '查看活動紀錄',
    icon: 'mdi-shield-account',
  },
  {
    title: '提供意見',
    value: '提供意見',
    icon: 'mdi-message-reply-text',
  },
]

const drawer = ref(false)
const group = ref(null)

watch(group, () => {
  drawer.value = false
})
</script>

<style scoped>
v-container {
  font-family: 'Google Sans', 'Noto Naskh Arabic UI', Arial, sans-serif;
}

#menu {
  box-shadow: none;
  --v-btn-size: 0.875rem;
  --v-btn-height: 48px;
  font-size: var(--v-btn-size);
  min-width: 48px;
  padding: 10px;
  margin-left: 10px;
  margin-bottom: 0px;
}

.menu:hover {
  box-shadow: 0px 0px 0px rgba(0, 0, 0, 0);
  opacity: 1;
}

.privacy {
  text-decoration: none;
  color: rgb(60, 64, 67);
  line-height: 1rem;
  font-size: 0.75rem;
  letter-spacing: 0.025em;
  font-weight: 400;
}
.privacy:hover {
  text-decoration: underline;
}
</style>
