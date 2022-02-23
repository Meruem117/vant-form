import type { FieldType } from 'vant'

interface configOptionType {
  label: string,
  type?: FieldType,
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
