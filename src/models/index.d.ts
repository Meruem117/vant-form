import { DelimiterCasedProperties } from 'type-fest'
import type { FieldType as BaseFieldType, CellSize, PickerColumn, PickerOption, DatetimePickerType, AreaList } from 'vant'

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
  type?: BaseFieldType,
  size?: CellSize,
  maxlength?: number | string,
  placeholder?: string,
  border?: boolean,
  disabled?: boolean,
  readonly?: boolean,
  colon?: boolean,
  required?: boolean,
  center?: boolean,
  clearable?: boolean,
  clear_icon?: string,
  is_link?: boolean,
  show_word_limit?: boolean
}

type FieldType = 'Text'
type PopupType = 'Picker' | 'DatetimePicker' | 'Area' | 'Calendar'
type PopupConfig = {
  overlay?: boolean,
  position?: 'top' | 'bottom' | 'right' | 'left',
  round?: boolean,
  closeable?: boolean
}

type PickerConfig = {
  columns?: (PickerOption | PickerColumn)[],
  'columns-field-names'?: object,
  'allow-html'?: boolean,
  'default-index'?: number | string,
} & SharedPickerConfig

type DatetimePickerConfig = {
  type?: DatetimePickerType,
  filter?: (type: string, values: string[]) => string[],
  formatter?: (type: string, value: string) => string,
  'columns-order'?: string[]
} & SharedPickerConfig

type AreaConfig = {
  value?: string,
  'area-list'?: AreaList,
  'columns-placeholder'?: string[],
  'columns-num'?: number | string,
  'is-oversea-code'?: () => boolean
} & SharedPickerConfig

type SharedPickerConfig = {
  title?: string,
  'confirm-button-text'?: string,
  'cancel-button-text'?: string,
  'toolbar-position'?: 'top' | 'bottom',
  'show-toolbar'?: boolean,
  loading?: boolean,
  readonly?: boolean,
  'item-height'?: number | string,
  'visible-item-count'?: number | string,
  'swipe-duration'?: number | string
}

type KebabCasedProperties<Value> = DelimiterCasedProperties<Value, '-'>;
