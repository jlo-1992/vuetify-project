<template>
  <v-container>
    <v-row>
      <v-col col="12">
        <h1>訂單</h1>
      </v-col>
      <v-divider />
      <v-col cols="12">
        <v-data-table :headers="headers" :items="orders">
          <template #[`item.cart`]="{ value }">
            <ul>
              <li v-for="item in value" :key="item._id">
                {{ item.product.name }} - {{ item.quantity }} 件
              </li>
            </ul>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useSnackbar } from 'vuetify-use-dialog'
import orderService from '@/services/order'

const createSnackbar = useSnackbar()

const orders = ref([])

// 與做管理員頁面的商品列表方式相同
const headers = [
  { title: '訂單編號', key: '_id' },
  {
    title: '建立日期',
    key: 'createdAt',
    value: (item) => new Date(item.createdAt).toLocaleString(),
  },
  { title: '商品', key: 'cart', sortable: false },
  {
    title: '金額',
    key: 'totalPrice',
    value: (item) =>
      item.cart.reduce((total, item) => total + item.product.price * item.quantity, 0),
  },
]

const getOrders = async () => {
  try {
    const { data } = await orderService.getMy()
    // data.result 是對照 controllers 的 order.js 內 export 的 getMy 回傳的內容，回傳的 property 是 result，所以是 data.result
    orders.value = data.result
  } catch (error) {
    console.error('Error fetching orders:', error)
    createSnackbar({
      text: '無法載入訂單資料',
      snackbarProps: {
        color: 'red',
      },
    })
  }
}
getOrders()
</script>

<route lang="yaml">
# 自定義頁面名稱-第二種方法
meta:
  title: '訂單'
  # 只能在有登入的情況下看
  login: 'login-only'
  # 不是管理員也可以看
  admin: false
</route>
