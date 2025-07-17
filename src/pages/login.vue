<template>
  <v-container>
    <v-row class="justify-center glass">
      <v-col cols="5">
        <h1 class="text-center">登入</h1>
      </v-col>
      <v-divider />
      <v-col cols="5">
        <v-form :disabled="form.isSubmitting.value" @submit.prevent="submit">
          <!-- counter 為輸入的文字建立一個計數器 -->
          <v-text-field
            v-model="account.value.value"
            :error-messages="account.errorMessage.value"
            label="帳號或信箱"
            required
          />
          <v-text-field
            v-model="password.value.value"
            counter
            :error-messages="password.errorMessage.value"
            label="密碼"
            maxlength="20"
            minlength="4"
            required
            type="password"
          />
          <v-btn block color="success" :loading="form.isSubmitting.value" type="submit">登入</v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useField, useForm } from 'vee-validate'
import { useRouter } from 'vue-router'
import { useSnackbar } from 'vuetify-use-dialog'
import * as yup from 'yup'
import userService from '@/services/user'
import { useUserStore } from '@/stores/user'

const createSnackbar = useSnackbar()
const router = useRouter()
const user = useUserStore()

// 建立 vee-validate 表單
const form = useForm({
  // 用 yup 定義表單驗證格式
  // https://github.com/jquense/yup
  // 前後端都要做驗證，且驗證的規則要一樣，前端是要回覆給使用者錯誤的原因，後端是要防止錯誤的資料進資料庫
  // 根據後端的 model 的 user.js 寫驗證
  validationSchema: yup.object({
    account: yup
      // 資料型態是文字
      .string()
      .required('帳號或電子郵件必填'), // 自訂驗證（驗證名稱, 錯誤訊息, 驗證的 function）
    password: yup
      .string()
      .required('密碼是必填的')
      .min(4, '密碼至少需要 4 個字元')
      .max(20, '密碼最多只能有 20 個字元'),
  }),
})

// 建立 vee-validate 的表單欄位，一定要在 useForm 後面
// useField(欄位名稱)
const account = useField('account')
const password = useField('password')

// vee-validate 的表單送出
// handleSubmit 表單驗證通過才會觸發的事件
// handleSubmit(處理function)
// values 表單所有欄位的值
const submit = form.handleSubmit(async (values) => {
  console.log(values)
  try {
    const { data } = await userService.login({
      account: values.account,
      password: values.password,
    })
    user.login(data.user)
    // 下方寫法會連確認密碼也一併送出，所以推薦每項資料分開寫
    // await userService.create(values)
    createSnackbar({
      text: '登入成功！',
      snackbarProps: {
        color: 'green',
      },
    })
    // 註冊成功後，導向到首頁
    router.push('/')
  } catch (error) {
    console.error(error)
    createSnackbar({
      text: error?.response?.data?.message || '登入失敗，請稍後再試！',
      snackbarProps: {
        color: 'red',
      },
    })
  }
})
</script>

<style scoped>
.glass {
  backdrop-filter: blur(10px); /* 模糊 */
  background-color: rgba(44, 42, 42, 0.788); /* 半透明白底 */
  border-radius: 16px;
  padding: 1rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}
</style>

<route lang="yaml">
# 自定義頁面名稱-第二種方法
meta:
  title: '登入'
  # 只能在沒登入的情況下看
  login: 'no-login-only'
  # 不是管理員也可以看
  admin: false
</route>
