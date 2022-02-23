import type { FieldType } from 'vant'

interface configOptionType {
  name: keyof dataType,
  label: string,
  type?: FieldType,
  placeholder?: string,
  disabled?: boolean,
  readonly?: boolean,
  center?: boolean,
  colon?: boolean,
  clearable?: boolean
}

export interface configType<T> {
  data: T,
  insert?: boolean,
  options: configOptionType[]
}

export interface dataType {
  name: string,
  password: string,
  age: number,
  address: string
}
