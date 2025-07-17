import apiService from './api'

// 做事情的時候呼叫 api，也會有錯誤訊息
export default {
  // 註冊
  create(data) {
    return apiService.api.post('/user', data)
  },
  login(data) {
    return apiService.api.post('/user/login', data)
  },
  // 取得使用者資料
  profile() {
    return apiService.apiAuth.get('/user/profile')
  },
  // token 舊換新
  refresh() {
    return apiService.apiAuth.patch('/user/refresh')
  },
  logout() {
    return apiService.apiAuth.delete('/user/logout')
  },
  // 新增商品至購物車
  cart(data) {
    return apiService.apiAuth.patch('/user/cart', data)
  },
  // 取得購物車的商品內容
  getCart() {
    return apiService.apiAuth.get('/user/cart')
  },
}
