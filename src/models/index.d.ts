import type { FieldType, PickerProps, PickerColumn, PickerOption, DatetimePickerType, AreaList } from 'vant'

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
  position?: PopupPosition,
  pickerConfig?: PickerConfig,
  datetimeConfig?: DatetimePickerConfig,
  areaList?: AreaList,
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
type PickerConfig = {
  title?: string,
  columns: (PickerOption | PickerColumn)[]
} | PickerProps
type PopupType = 'Picker' | 'DatetimePicker' | 'Area' | 'Calendar'
type PopupPosition = 'top' | 'bottom' | 'right' | 'left'
type DatetimePickerConfig = {
  title?: string,
  type?: DatetimePickerType,
}
