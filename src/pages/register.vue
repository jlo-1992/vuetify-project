<template>
  <v-container>
    <v-row class="justify-center glass">
      <v-col cols="5">
        <h1 class="text-center">註冊</h1>
      </v-col>
      <v-divider />
      <v-col class="text-center" cols="5">
        <v-form :disabled="form.isSubmitting.value" @submit.prevent="submit">
          <!-- counter 為輸入的文字建立一個計數器 -->
          <v-text-field
            v-model="account.value.value"
            counter
            :error-messages="account.errorMessage.value"
            label="帳號"
            maxlength="20"
            minlength="4"
            required
          />
          <v-text-field
            v-model="email.value.value"
            :error-messages="email.errorMessage.value"
            label="信箱"
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
          <v-text-field
            v-model="confirmPassword.value.value"
            counter
            :error-messages="confirmPassword.errorMessage.value"
            label="確認密碼"
            maxlength="20"
            minlength="4"
            required
            type="password"
          />
          <v-btn block color="primary" :loading="form.isSubmitting.value" type="submit">註冊</v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import validator from 'validator'
import { useField, useForm } from 'vee-validate'
import { useRouter } from 'vue-router'
import { useSnackbar } from 'vuetify-use-dialog'
import * as yup from 'yup'
import userService from '@/services/user'

// 自定義頁面名稱-第一種方法
// https://uvr.esm.is/guide/extending-routes.html#definepage
// definePage({
//   meta: {
//     title: '註冊',
//   },
// })

const createSnackbar = useSnackbar()
const router = useRouter()

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
      .required('帳號必填')
      .min(4, '帳號至少 4 字元')
      .max(20, '帳號最多 20 字元')
      // 自訂驗證（驗證名稱, 錯誤訊息, 驗證的 function）
      .test('isAlphanumeric', '帳號只能包含英文字母和數字', (value) => {
        return validator.isAlphanumeric(value)
      }),
    email: yup
      .string()
      .required('電子郵件是必填的')
      .test('isEmail', '請輸入有效的電子郵件地址', (value) => {
        return validator.isEmail(value)
      }),
    password: yup
      .string()
      .required('密碼是必填的')
      .min(4, '密碼至少需要 4 個字元')
      .max(20, '密碼最多只能有 20 個字元'),
    confirmPassword: yup
      .string()
      .required('確認密碼是必填的')
      // .oneOf(陣列, 訊息)   欄位的值必須是陣列內的其中一個
      // .ref(欄位)          取得欄位的值
      // .ref(password)       欄位的值必須是 password 陣列欄位內的其中一個值
      .oneOf([yup.ref('password')], '密碼和確認密碼必須相同'),
  }),
})

// 建立 vee-validate 的表單欄位，一定要在 useForm 後面
// useField(欄位名稱)
const account = useField('account')
const email = useField('email')
const password = useField('password')
const confirmPassword = useField('confirmPassword')

// vee-validate 的表單送出
// handleSubmit 表單驗證通過才會觸發的事件
// handleSubmit(處理function)
// values 表單所有欄位的值
const submit = form.handleSubmit(async (values) => {
  console.log(values)
  try {
    await userService.create({
      account: values.account,
      email: values.email,
      password: values.password,
    })
    // userService.create(values) 的寫法會連確認密碼也一併送出，所以推薦每項資料分開寫
    // await userService.create(values)
    createSnackbar({
      text: '註冊成功！',
      snackbarProps: {
        color: 'green',
      },
    })
    // 註冊成功後，導向到登入頁面
    router.push('/login')
  } catch (error) {
    console.error(error)
    createSnackbar({
      text: error?.response?.data?.message || '註冊失敗，請稍後再試！',
      snackbarProps: {
        color: 'red',
      },
    })
  }
})
</script>

<!-- https://uvr.esm.is/guide/extending-routes.html#sfc-route-custom-block -->
<route lang="yaml">
# 自定義頁面名稱-第二種方法
meta:
  title: '註冊'
  # 只能在沒登入的情況下看
  login: 'no-login-only'
  # 不是管理員也可以看
  admin: false
</route>

<style scoped>
.glass {
  backdrop-filter: blur(10px); /* 模糊 */
  background-color: rgba(44, 42, 42, 0.788); /* 半透明白底 */
  border-radius: 16px;
  padding: 1rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}
</style>

<!--
# 也可以用 json 寫，預設是 json
<route>
{
  "meta": {
    "title": "註冊",
    "login": "no-login-only",
    "admin": false
  }
}
</route>
-->
