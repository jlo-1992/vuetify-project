<template>
  <v-app>
    <div class="home-bg">
      <v-app-bar>
        <v-container class="d-flex align-center">
          <v-app-bar-title>
            <router-link style="text-decoration: none; color: white" to="/">購物網站</router-link>
          </v-app-bar-title>
          <template v-for="item of navItems" :key="item.to">
            <v-btn v-if="item.show" :prepend-icon="item.icon" :to="item.to"
              >{{ item.title }}
              <!-- v-badge 增加購物車上的紅點，顯示購物車內的商品數量 -->
              <v-badge
                v-if="item.to === '/cart' && user.cartTotal > 0"
                color="red"
                :content="user.cartTotal"
                floating
              />
            </v-btn>
          </template>
          <v-btn v-if="user.isLoggedIn" prepend-icon="mdi-logout" @click="logout">登出</v-btn>
        </v-container>
      </v-app-bar>
      <v-main>
        <v-container>
          <!-- 加了 :key="$route.fullPath" 才能解決查詢商品時，原本網址換 id 網頁不會更新的問題 -->
          <!-- 會發生原本的問題的原因是因為路由是根據 name: /product/[id] 來轉換網頁 -->
          <router-view :key="$route.fullPath" />
        </v-container>
      </v-main>
    </div>
  </v-app>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useSnackbar } from 'vuetify-use-dialog'
import userService from '@/services/user'
import { useUserStore } from '@/stores/user'

const user = useUserStore()
const createSnackbar = useSnackbar()
const router = useRouter()

// 讓導覽列會根據登入狀態作動態顯示
const navItems = computed(() => [
  { title: '首頁', to: '/', icon: 'mdi-home', show: true },
  { title: '註冊', to: '/register', icon: 'mdi-account-plus', show: !user.isLoggedIn },
  { title: '登入', to: '/login', icon: 'mdi-login', show: !user.isLoggedIn },
  { title: '購物車', to: '/cart', icon: 'mdi-cart', show: user.isLoggedIn },
  { title: '訂單', to: '/orders', icon: 'mdi-invoice-list-outline', show: user.isLoggedIn },
  { title: '管理', to: '/admin', icon: 'mdi-cog', show: user.isLoggedIn && user.isAdmin },
])

const logout = async () => {
  try {
    await userService.logout()
  } catch (error) {
    console.error(error)
  }
  user.logout()
  // 登出後跳轉回首頁
  router.push('/')
  createSnackbar({
    text: '登出成功！',
    snackbarProps: {
      color: 'green',
    },
  })
}
</script>

<style scoped>
.home-bg {
  background-image: url('https://picsum.photos/1920/1080/?random=1');
  background-size: cover;
  background-position: center;
  min-height: 100vh;
}
</style>
