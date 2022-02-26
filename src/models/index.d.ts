import type { FieldType, PickerColumn, DatetimePickerType } from 'vant'

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
  options: configOptionType<T>[]
}

type configOptionType<T> = {
  name: keyof T,
  slot?: string,
  fieldType?: FieldType,
  label?: string,
  popupType?: PopupType,
  title?: string,
  columns?: PickerColumn[],
  dateType?: DatetimePickerType,
  placeholder?: string,
  disabled?: boolean,
  readonly?: boolean,
  center?: boolean,
  colon?: boolean,
  clearable?: boolean
}

type PopupType = 'Picker' | 'DatetimePicker' | 'Area' | 'Calendar'
