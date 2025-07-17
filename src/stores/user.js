// Utilities
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

// 把登入得到的 token 存入 pinia
export const useUserStore = defineStore(
  'user',
  () => {
    // 把登入收到的值，放入下方參數的值
    const account = ref('')
    const cartTotal = ref(0)
    const role = ref('user')
    const token = ref('')

    // 確認是否登入
    const isLoggedIn = computed(() => token.value.length > 0)
    // 確認是否為管理員
    const isAdmin = computed(() => role.value === 'admin')

    const login = (data) => {
      account.value = data.account
      cartTotal.value = data.cartTotal
      role.value = data.role

      // 重新整理頁面時，用 token 取得使用者資料，這個回應不包含 token
      if (data.token) {
        token.value = data.token
      }
    }
    const logout = () => {
      account.value = ''
      cartTotal.value = 0
      role.value = 'user'
      token.value = ''
    }

    return {
      account,
      cartTotal,
      role,
      token,
      isLoggedIn,
      isAdmin,
      login,
      logout,
    }
  },
  {
    persist: {
      key: 'shop-user',
      pick: ['token'],
    },
  }
)
