import { isSupportTouch } from './shared'

export const POINTER_DOWN = isSupportTouch ? 'touchstart' : 'mousedown'
export const POINTER_MOVE = isSupportTouch ? 'touchmove' : 'mousemove'
export const POINTER_UP = isSupportTouch ? 'touchend' : 'mouseup'
