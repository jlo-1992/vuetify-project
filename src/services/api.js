import axios from 'axios'
import userService from '@/services/user'
import { useUserStore } from '@/stores/user'

// axios.create 建立一個有自己預設設定的 axios
// baseURL = http://localhost:4000
// api.post('/user')
// api.post('/user/login')
// baseURL = x
// axios.post('http://localhost:4000/user')
// axios.post('http://localhost:4000/user/login')
// 用於避免重複的程式碼，不用每次都寫完整的 URL
const api = axios.create({
  // 之後後端放上 render 後，VITE_API_URL 就改成 render 的網址
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000',
})

const apiAuth = axios.create({
  // 之後後端放上 render 後，VITE_API_URL 就改成 render 的網址
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000',
})

// axios 攔截器
// 1. axios.get() axios.post()
// 2. 請求攔截器 interceptors.request
// 3. 送出
// 4. 回應攔截器 interceptors.response
// 5. await / .then() .catch()

// 在 axios 送出請求前，執行下方 apiAuth 函式取得 token，加入取得的 token 後再執行 axios 請求

// 在每個請求前，加入 token
// config = 請求設定值，路徑、資料等等
apiAuth.interceptors.request.use((config) => {
  const user = useUserStore()
  config.headers.Authorization = `Bearer ${user.token}`
  return config
})

// .use(成功處理, 失敗處理)
// 成功處理就把回應直接丟出去
apiAuth.interceptors.response.use(
  (res) => res,
  async (error) => {
    // 如果錯誤有回應的話（沒網路的話不會有回應）
    // 而且是 400 錯誤，而且是過期錯誤，而且請求不是更新
    if (
      error.response &&
      error.response.status === 400 &&
      error.response.data.message === 'token 已過期' &&
      error.config.url !== '/user/refresh'
    ) {
      const user = useUserStore()
      try {
        // 傳送更新請求
        const { data } = await userService.refresh()
        // 更新使用者資料
        user.token = data.token
        // 修改發生錯誤的請求設定，換成新的 token
        error.config.headers.Authorization = `Bearer ${data.token}`
        // 重新發送原本的請求
        return axios(error.config)
      } catch {
        // 如果更新失敗，清除 pinia 存的使用者 token 和資料
        user.logout()
      }
    }
    // 如果沒有回應，或是其他錯誤就回傳原本的錯誤
    throw error
  }
)

// 用新的設定（有 token）執行請求
export default { api, apiAuth }
