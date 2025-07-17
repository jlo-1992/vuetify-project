// Utilities
import { createPinia } from 'pinia'
// 安裝完就可以有 localStorage 的功能
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

export default pinia
