<template>
  <v-container>
    <v-row>
      <v-col col="12">
        <h1 class="text-center">購物車</h1>
      </v-col>
      <v-divider />
      <v-col cols="12">
        <!-- lines 為欄高 -->
        <v-list lines="two">
          <template v-for="(item, i) in cart" :key="item._id">
            <!-- :active="!item.product.sell" color="red" 如購物車內的商品已被下架，背景顏色會變成紅色 -->
            <v-list-item :active="!item.product.sell" color="red">
              <!-- 圖片用插槽置入 -->
              <template #prepend>
                <v-avatar
                  class="cursor-pointer"
                  rounded="0"
                  @click="$router.push('/product/' + item.product._id)"
                >
                  <v-img :src="item.product.image" />
                </v-avatar>
              </template>
              <v-list-item-title @click="">
                <router-link
                  class="text-decoration-none text-white"
                  :to="'/product/' + item.product._id"
                >
                  {{ item.product.name }}
                </router-link>
              </v-list-item-title>
              <v-list-item-subtitle> 價格: {{ item.product.price }} 元 </v-list-item-subtitle>
              <template #append>
                <!-- https://vuetifyjs.com/en/components/number-inputs/#usage -->
                <v-number-input
                  control-variant="split"
                  hide-details
                  :min="0"
                  :model-value="item.quantity"
                  variant="outlined"
                  width="150"
                  @update:model-value="updateCart($event, item, i)"
                />
                <!-- 如果直接綁定 v-model，原本的值會直接被新的值取代，無法得知舊的數量，因而無法將更新的值傳給後端 -->
                <!-- 所以拆成 :model-value="item.quantity" （取得原本的值） 及 @update:model-value="updateCart($event, item, i)" （將更新的值傳給購物車） 兩個屬性 -->
              </template>
            </v-list-item>
            <!-- v-if="i < cart.length - 1" 最後一欄下方不顯示分隔線 -->
            <v-divider v-if="i < cart.length - 1" />
          </template>
        </v-list>
      </v-col>
      <v-col class="text-center" cols="12">
        <p>總金額：{{ totalPrice }}</p>
        <v-btn class="mt-3" color="primary" :disabled="checkoutDisable" @click="checkout"
          >結帳</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useSnackbar } from 'vuetify-use-dialog'
import orderService from '@/services/order'
import userService from '@/services/user'
import { useUserStore } from '@/stores/user'

const createSnackbar = useSnackbar()
const user = useUserStore()
const router = useRouter()

const cart = ref([])

const getCart = async () => {
  try {
    // 從 userService 取得後端的購物車資訊
    const { data } = await userService.getCart()
    cart.value = data.result
  } catch (error) {
    console.error(error)
    createSnackbar({
      text: '無法獲取購物車資料',
      snackbarProps: {
        color: 'red',
      },
    })
  }
}
getCart()

const updateCart = async (newValue, item, i) => {
  try {
    // 跟後端的資料做連結
    const { data } = await userService.cart({
      product: item.product._id,
      // 將新的數量減掉原本的數量後，把得到的值傳到後端
      quantity: newValue - item.quantity,
    })
    // 目前商品的數量等於新的數量
    item.quantity = newValue
    // 如果更新後的數量少於或等於零，商品會被刪除
    if (newValue <= 0) {
      cart.value.splice(i, 1)
    }
    // 更新購物車總數，會顯示在導覽列購物車上的紅色圓點
    user.cartTotal = data.result
  } catch (error) {
    console.error(error)
    createSnackbar({
      text: '更新購物車失敗',
      snackbarProps: {
        color: 'red',
      },
    })
  }
}

// .reduce(計算的 function, 初始值)
const totalPrice = computed(() => {
  return cart.value.reduce((total, item) => total + item.product.price * item.quantity, 0)
})

// 結帳的按鈕是否停用，需判斷購物車內是否有商品以及是否有已下架商品
// 如陣列中有符合函數的值，.some 會回傳 true，否則回傳 false，不會修改原始的陣列
const checkoutDisable = computed(() => {
  return cart.value.length === 0 || cart.value.some((item) => !item.product.sell)
})

const checkout = async () => {
  try {
    // 建立訂單
    await orderService.create()
    // 把購物車清空，導航列購物車上的紅點歸零
    user.cartTotal = 0
    // 將使用者導至訂單頁面
    router.push('/orders')
  } catch {
    console.error(error)
    createSnackbar({
      text: '結帳失敗',
      snackbarProps: {
        color: 'red',
      },
    })
  }
}
</script>

<route lang="yaml">
# 自定義頁面名稱-第二種方法
meta:
  title: '購物車'
  # 只能在有登入的情況下看
  login: 'login-only'
  # 不是管理員也可以看
  admin: false
</route>
