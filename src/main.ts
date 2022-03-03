import { createApp } from 'vue'
import App from './App.vue'
import {
  Form, Button, Toast, Dialog, Notify, Loading, Cell, CellGroup,
  Field, Radio, RadioGroup, Checkbox, CheckboxGroup, Cascader, Slider, Stepper, Switch, Rate, Uploader,
  ActionSheet, Popup, Picker, DatetimePicker, Area, Calendar
} from 'vant'

createApp(App)
  .use(Form)
  .use(Button)
  .use(Toast)
  .use(Dialog)
  .use(Notify)
  .use(Loading)
  .use(Cell)
  .use(CellGroup)
  .use(Field)
  .use(Radio)
  .use(RadioGroup)
  .use(Checkbox)
  .use(CheckboxGroup)
  .use(Cascader)
  .use(Slider)
  .use(Stepper)
  .use(Switch)
  .use(Rate)
  .use(Uploader)
  .use(ActionSheet)
  .use(Popup)
  .use(Picker)
  .use(DatetimePicker)
  .use(Area)
  .use(Calendar)
  .mount('#app')
