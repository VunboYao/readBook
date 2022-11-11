import { ComponentPublicInstance } from 'vue'

export type DialogAction = 'confirm' | 'cancel' | 'close'

export type DialogOptions = {
  title?: string
  [key: string]: any
}

export type ComponentInstance = ComponentPublicInstance<{}, any>
