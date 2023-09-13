import '@/assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { Skeletor } from 'vue-skeletor';
const app = createApp(App)

app.use(router)
app.component(Skeletor.name, Skeletor)
app.mount('#app')
