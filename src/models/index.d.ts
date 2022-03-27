import type { ConfigOption } from './types'

export interface Data {
  [key: string]: any,
  name: string,
  password: string,
  age: number,
  gender: string,
  hobby: string,
  switch: boolean,
  address: string,
  city: string,
  date: string
}

export declare type BaseProps = {
  key: keyof Data,
  data: unknown,
  config: ConfigOption<Data>,
  set: (key: keyof Data, value: string | number) => void
}