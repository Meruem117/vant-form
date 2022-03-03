import { DelimiterCasedProperties } from 'type-fest'
import type {
  FieldType as FieldBaseType, CellSize, FieldClearTrigger, FieldTextAlign, FieldFormatTrigger, FieldAutosizeConfig, FieldRule,
  PopupPosition, PopupCloseIconPosition, PickerToolbarPosition, PickerColumn, PickerOption, DatetimePickerType, AreaList
} from 'vant'

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
  fieldConfig?: FieldConfig,
  popupType?: PopupType,
  popupConfig?: PopupConfig,
  pickerConfig?: PickerConfig,
  datetimeConfig?: DatetimePickerConfig,
  areaConfig?: AreaConfig
} & FieldBaseConfig

type FieldType = 'Text'
type PopupType = 'Picker' | 'DatetimePicker' | 'Area' | 'Calendar'

type FieldBaseConfig = {
  label?: string,
  placeholder?: string,
  disabled?: boolean,
  readonly?: boolean,
  required?: boolean,
  clearable?: boolean,
  is_link?: boolean,
  left_icon?: string,
  right_icon?: string,
  rules?: FieldRule[]
}

type FieldConfig = {
  type?: FieldBaseType,
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
  'clear-icon'?: string,
  'clear-trigger'?: FieldClearTrigger,
  clickable?: boolean,
  'is-link'?: boolean,
  autofocus?: boolean,
  'show-word-limit'?: boolean,
  error?: boolean,
  'error-message'?: string,
  'error-message-align'?: FieldTextAlign,
  formatter?: (val: string) => string,
  'format-trigger'?: FieldFormatTrigger,
  'arrow-direction'?: 'left' | 'up' | 'down' | 'right',
  'label-class'?: string | Array | object,
  'label-width'?: number | string,
  'label-align'?: FieldTextAlign,
  'input-align'?: FieldTextAlign,
  autosize?: boolean | FieldAutosizeConfig,
  'left-icon'?: string,
  'right-icon'?: string,
  'icon-prefix'?: string,
  rules?: FieldRule[],
  autocomplete?: string
}

type PopupConfig = {
  overlay?: boolean,
  position?: PopupPosition,
  'overlay-class'?: string | Array | object,
  'overlay-style'?: object,
  duration?: number | string,
  round?: boolean,
  'lock-scroll'?: boolean,
  'lazy-render'?: boolean,
  'close-on-popstate'?: boolean,
  'close-on-click-overlay'?: boolean,
  closeable?: boolean,
  'close-icon'?: string,
  'close-icon-position'?: PopupCloseIconPosition,
  'before-close'?: (action: string) => boolean | Promise<boolean>,
  'icon-prefix'?: string,
  transition?: string,
  'transition-appear'?: boolean,
  teleport?: string | Element,
  'safe-area-inset-bottom'?: boolean
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
  'columns-order'?: string[],
  'min-date'?: Date,
  'max-date'?: Date,
  'min-hour'?: number | string,
  'max-hour'?: number | string,
  'min-minute'?: number | string,
  'max-minute'?: number | string
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
  'toolbar-position'?: PickerToolbarPosition,
  'show-toolbar'?: boolean,
  loading?: boolean,
  readonly?: boolean,
  'item-height'?: number | string,
  'visible-item-count'?: number | string,
  'swipe-duration'?: number | string
}

export type KebabCasedProperties<Value> = DelimiterCasedProperties<Value, '-'>