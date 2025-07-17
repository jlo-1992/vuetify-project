<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="text-center">{{ product.name }}</h1>
      </v-col>
      <v-divider />
      <v-col>
        <v-img class="mb-4" contain height="400" :src="product.image" />
      </v-col>
      <v-col cols="12" md="6">
        <p>分類：{{ product.category }}</p>
        <p>價格：{{ product.price }}</p>
        <v-divider class="my-5" />
        <!-- 加上 style="white-space: pre;"，換行才會正常顯示 -->
        <p style="white-space: pre">描述：{{ product.description }}</p>
        <!-- :min 得到的是數字，min 得到的是字串 -->
        <v-number-input v-model="quantity" control-variant="split" :min="1" variant="filled" />
        <v-btn class="mt-4" color="primary" :disabled="!product.sell" @click="addToCart">
          加入購物車
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
  <!--  :model-value="!product.sell" 已下架才會執行 -->
  <v-overlay
    class="align-center justify-center text-center"
    :model-value="!product.sell"
    opacity="0.5"
    persistent
    scrim="black"
  >
    <h1>已下架</h1>
    <p class="mt-3">這個商品已下架，無法購買</p>
    <v-btn class="mt-4" color="success" to="/"> 返回首頁 </v-btn>
  </v-overlay>
</template>

<script setup>
// import { useField, useForm } from 'vee-validate'
import { ref } from 'vue'
// 引入要使用的功能
import { useRoute, useRouter } from 'vue-router'
import { useSnackbar } from 'vuetify-use-dialog'
// import service 才可以呼叫 API
import productService from '@/services/product'
import userService from '@/services/user'
import { useUserStore } from '@/stores/user'

// import 完記得都要 use
const createSnackbar = useSnackbar()
const router = useRouter()
const route = useRoute()
// 更新 pinia 裡購物車商品的數量
const user = useUserStore()

// 這裡 ref 內不能用 undefined 或 null，因為真正的資料要在 mounted 的時候才會傳輸進來，而 undefined 跟 null 沒有 .name，所以會出錯
// 商品變數的預設值
const product = ref({
  name: '',
  price: 0,
  description: '',
  category: '',
  sell: true,
  image: '',
})

// 取商品的 function
const getProduct = async () => {
  try {
    const { data } = await productService.getId(route.params.id)
    product.value.name = data.product.name
    product.value.price = data.product.price
    product.value.description = data.product.description
    product.value.category = data.product.category
    product.value.sell = data.product.sell
    product.value.image = data.product.image

    // 更改本頁面標題顯示
    document.title = `${data.product.name} | 購物網站`
  } catch (error) {
    console.error('Error fetching products:', error)
    createSnackbar({
      text: '無法載入商品資料',
      snackbarProps: {
        color: 'red',
      },
    })
    // 發生錯誤就把使用者傳送回首頁
    router.push('/')
  }
}
getProduct()

// 建立購物車數量的變數，與上方 input 用 v-model 做連結
const quantity = ref(1)
// 加入購物車的功能
const addToCart = async () => {
  try {
    const { data } = await userService.cart({
      // 這裡的欄位需與後端 controller user.js 裡 cart 內的購物車內容相同
      product: route.params.id,
      quantity: quantity.value,
    })
    // 更新 pinia 裡購物車商品的數量
    user.cartTotal = data.result
    createSnackbar({
      text: '已加入購物車',
      snackbarProps: {
        color: 'green',
      },
    })
  } catch (error) {
    console.error('Error fetching products:', error)
    createSnackbar({
      text: '無法加入購物車',
      snackbarProps: {
        color: 'red',
      },
    })
    // 發生錯誤後將使用者導回首頁
    router.push('/')
  }
}
</script>

<route lang="yaml">
meta:
  # 此處為標題的預設值，真實的標題上面已用 document.title 更改
  title: '商品'
  # 有沒有登入都能看
  login: ''
  # 不是管理員也能看
  admin: false
</route>

<style scoped></style>
