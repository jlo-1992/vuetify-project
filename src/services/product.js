import apiService from './api'

// 做事情的時候呼叫 api，也會有錯誤訊息
export default {
  // 建立新商品
  create(data) {
    // apiAuth 表示有登入才可以
    return apiService.apiAuth.post('/product', data)
  },
  // 取得包含未上架的所有商品，只要有 apiAuth 就表示有登入才可以看到
  getAll() {
    return apiService.apiAuth.get('/product/all')
  },
  // 只取得上架商品，不須登入也能取得
  get() {
    return apiService.api.get('/product')
  },
  // 沒有登入也能透過 id 查詢商品，查到已下架的商品也沒關係，只要標記清楚已下架即可
  getId(id) {
    return apiService.api.get('/product/' + id)
  },
  update(id, data) {
    return apiService.apiAuth.patch(`/product/${id}`, data)
  },
}
