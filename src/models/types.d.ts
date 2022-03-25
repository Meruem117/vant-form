import { CamelCase, DelimiterCasedPropertiesDeep } from 'type-fest'
import type {
  FieldType as FieldBaseType, CellSize, FieldClearTrigger, FieldTextAlign, FieldFormatTrigger, FieldAutosizeConfig, FieldRule,
  RadioShape, RadioLabelPosition, RadioGroupDirection, CheckboxShape, CheckboxLabelPosition, CheckboxGroupDirection,
  PopupPosition, PopupCloseIconPosition, PickerToolbarPosition, PickerColumn, PickerOption, DatetimePickerType, AreaList, CascaderOption, CascaderFieldNames
} from 'vant'
import { Data } from './index'

export declare type Config<T = Data> = {
  globalClass?: string,
  insert?: boolean,
  options: ConfigOption<T>[]
}

export declare type ConfigOption<T = Data> = {
  name: keyof T,
  default?: string | number,
  slot?: string,
  fieldType?: FieldType,
  inline?: boolean,
  fieldConfig?: FieldConfig,
  radioConfig?: RadioGroupConfig,
  checkboxConfig?: CheckboxGroupConfig,
  popupType?: PopupType,
  popupConfig?: PopupConfig,
  pickerConfig?: PickerConfig,
  datetimeConfig?: DatetimePickerConfig,
  cascaderConfig?: CascaderConfig,
  areaConfig?: AreaConfig
} & FieldBaseConfig

type FieldType = 'Text' | 'Radio' | 'Checkbox' | 'Switch' | 'Slider' | 'Stepper' | 'Rate'
type PopupType = 'Picker' | 'DatetimePicker' | 'Area' | 'Cascader' | 'Calendar'

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

type RadioConfig = {
  shape?: RadioShape,
  'label-position'?: RadioLabelPosition
} & SharedBoxConfig

type RadioGroupConfig = {
  options?: RadioConfig[],
  direction?: RadioGroupDirection
} & SharedBoxGroupConfig

type CheckboxConfig = {
  shape?: CheckboxShape,
  'bind-group'?: boolean,
  'label-position'?: CheckboxLabelPosition
} & SharedBoxConfig

type CheckboxGroupConfig = {
  options?: CheckboxConfig[],
  max?: number | string,
  direction?: CheckboxGroupDirection,
} & SharedBoxGroupConfig

type SharedBoxConfig = {
  name?: string,
  label?: number | string,
  'label-disabled'?: boolean,
} & SharedBoxGroupConfig

type SharedBoxGroupConfig = {
  disabled?: boolean,
  'icon-size'?: number | string,
  'checked-color'?: string
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

type CascaderConfig = {
  title?: string,
  value?: string | number,
  options: CascaderOption[],
  placeholder?: string,
  'active-color'?: string,
  swipeable?: boolean,
  closeable?: boolean,
  'show-header'?: boolean,
  'close-icon'?: string,
  'field-names'?: CascaderFieldNames
}

// eslint-disable-next-line @typescript-eslint/ban-types
export type CamelCasedPropertiesDeep<Value> = Value extends Function
  ? Value
  : Value extends Array<infer U>
  ? Array<CamelCasedPropertiesDeep<U>>
  : Value extends Set<infer U>
  ? Set<CamelCasedPropertiesDeep<U>> : {
    [K in keyof Value as CamelCase<K>]: CamelCasedPropertiesDeep<Value[K]>;
  }

export type KebabCasedProperties<Value> = DelimiterCasedPropertiesDeep<Value, '-'>