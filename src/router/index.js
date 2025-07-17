/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { setupLayouts } from 'virtual:generated-layouts'
// eslint-disable-next-line import/no-duplicates
import { createRouter, createWebHashHistory, START_LOCATION } from 'vue-router/auto'
// START_LOCATION 初始導航，從沒有頁面導航到某個頁面
// eslint-disable-next-line import/no-duplicates
import { routes } from 'vue-router/auto-routes'
import userService from '@/services/user'
import { useUserStore } from '@/stores/user'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: setupLayouts(routes),
})

// 進入頁面前，先確認使用者是否為登入狀態（有沒有 token），判斷完畢後決定導航至不同的頁面狀態（例如顯示不同的導航列）
// to 去哪個頁面，from 要去哪個頁面，next 是否讓它通過
router.beforeEach(async (to, from, next) => {
  const user = useUserStore()
  // 用有沒有 token 判斷是否為登入狀態
  // 第一次進入網站初始導航時，如果有 token，就取使用者資料
  if (from === START_LOCATION && user.isLoggedIn) {
    try {
      const { data } = await userService.profile()
      user.login(data.user)
    } catch (error) {
      console.error(error)
      user.token = ''
    }
  }

  // 根據登入狀態和頁面路徑進行導航守衛，例如阻止已登入的使用者進入登入及註冊頁面
  if (to.meta.login === 'no-login-only' && user.isLoggedIn) {
    next('/')
    // 去登入限定頁面，例如購物車及訂單，且使用者非登入狀態，導航回登入頁面
  } else if (to.meta.login === 'login-only' && !user.isLoggedIn) {
    next('/login')
    // 去管理員限定頁面，且使用者非管理員，導航回首頁
  } else if (to.meta.admin && !user.isAdmin) {
    next('/')
  } else {
    // 資格皆符合，則不阻擋
    next()
  }
})

// 換頁之後更改網頁的標題
router.afterEach((to) => {
  document.title = `${to.meta.title} | 購物網站`
})

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (localStorage.getItem('vuetify:dynamic-reload')) {
      console.error('Dynamic import error, reloading page did not fix it', err)
    } else {
      console.log('Reloading page to fix dynamic import error')
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    }
  } else {
    console.error(err)
  }
})

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

export default router
