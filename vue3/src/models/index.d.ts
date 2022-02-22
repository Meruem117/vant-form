import type { FieldType } from 'vant'

interface configOptionType {
  label: string,
  type?: FieldType
}

export interface configType {
  options: configOptionType[]
}
