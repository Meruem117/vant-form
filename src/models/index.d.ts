import type { FieldType, PickerColumn, PickerOption, DatetimePickerType, AreaList } from 'vant'

export declare type dataType = {
  [key: string]: string | number,
  name: string,
  password: string,
  age: number,
  address: string,
  city: string,
  date: string
}

export declare type configType<T = dataType> = {
  globalClass?: string,
  insert?: boolean,
  options: ConfigOption<T>[]
}

type ConfigOption<T> = {
  name: keyof T,
  slot?: string,
  fieldType?: FieldType,
  popupType?: PopupType,
  popupConfig?: PopupConfig,
  pickerConfig?: PickerConfig,
  datetimeConfig?: DatetimePickerConfig,
  areaConfig?: AreaConfig
} & FieldConfig

type FieldConfig = {
  label?: string,
  placeholder?: string,
  disabled?: boolean,
  readonly?: boolean,
  center?: boolean,
  colon?: boolean,
  clearable?: boolean
}

type PopupType = 'Picker' | 'DatetimePicker' | 'Area' | 'Calendar'
type PopupConfig = {
  overlay?: boolean,
  position?: 'top' | 'bottom' | 'right' | 'left',
  round?: boolean,
  closeable?: boolean
}

type PickerConfig = {
  columns: (PickerOption | PickerColumn)[],
  default_index?: number | string,
} & SharedConfig

type DatetimePickerConfig = {
  type?: DatetimePickerType,
} & SharedConfig

type AreaConfig = {
  areaList?: AreaList,
}

type SharedConfig = {
  title?: string,
  confirm_button_text?: string,
  cancel_button_text?: string,
  toolbar_position?: 'top' | 'bottom',
  loading?: boolean,
  show_toolbar?: boolean,
  item_height?: number | string,
  visible_item_count?: number | string,
  swipe_duration?: number | string
}
