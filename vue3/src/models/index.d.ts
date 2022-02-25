import type { FieldType, DatetimePickerType } from 'vant'

type PopupType = 'Picker' | 'DatetimePicker' | 'Area' | 'Calendar'

type configOptionType = {
  name: keyof dataType,
  slot?: string,
  fieldType?: FieldType,
  popupType?: PopupType,
  label?: string,
  columns?: string[],
  dateType?: DatetimePickerType,
  placeholder?: string,
  disabled?: boolean,
  readonly?: boolean,
  center?: boolean,
  colon?: boolean,
  clearable?: boolean
}

export interface configType {
  insert?: boolean,
  options: configOptionType[]
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
