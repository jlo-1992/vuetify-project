import apiService from './api'

export default {
  // 建立新訂單
  create() {
    // apiAuth 表示有登入才可以
    return apiService.apiAuth.post('/order')
  },
  // 使用者取得自己的訂單資料
  getMy() {
    return apiService.apiAuth.get('/order/my')
  },
  // 管理者取得所有訂單資料
  getAll() {
    return apiService.apiAuth.get('/order/all')
  },
}
