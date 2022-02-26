import { createApp } from 'vue'
import App from './App.vue'
import { Form, Button, CellGroup, Cell, Field, Popup, Picker, DatetimePicker, Area, Calendar } from 'vant'

createApp(App)
  .use(Form)
  .use(Button)
  .use(CellGroup)
  .use(Cell)
  .use(Field)
  .use(Popup)
  .use(Picker)
  .use(DatetimePicker)
  .use(Area)
  .use(Calendar)
  .mount('#app')
