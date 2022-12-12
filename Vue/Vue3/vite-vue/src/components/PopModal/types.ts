import { ComponentPublicInstance } from 'vue'

// 确认、取消，遮罩关闭建议用close
export type DialogAction = 'confirm' | 'cancel' | 'close'

export type ComponentInstance = ComponentPublicInstance<{}, any>

export interface PopOptions {
  // 资源地址
  imgSrc: string
}
