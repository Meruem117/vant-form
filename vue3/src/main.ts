import { createApp } from 'vue'
import App from './App.vue'
import { Form, Field, CellGroup, Button } from 'vant'

createApp(App)
  .use(Form)
  .use(Field)
  .use(CellGroup)
  .use(Button)
  .mount('#app')
