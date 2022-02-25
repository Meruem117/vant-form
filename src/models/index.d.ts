import type { FieldType, DatetimePickerType } from 'vant'

type PopupType = 'Picker' | 'DatetimePicker' | 'Area' | 'Calendar'

type configOptionType<T> = {
  name: keyof T,
  slot?: string,
  fieldType?: FieldType,
  label?: string,
  popupType?: PopupType,
  title?: string,
  columns?: string[],
  dateType?: DatetimePickerType,
  placeholder?: string,
  disabled?: boolean,
  readonly?: boolean,
  center?: boolean,
  colon?: boolean,
  clearable?: boolean
}

export interface configType<T> {
  insert?: boolean,
  options: configOptionType<T>[]
}

export interface dataType {
  name: string,
  password: string,
  age: number,
  address: string,
  city: string,
  date: string
}

export interface showType {
  [key: string]: boolean
}
