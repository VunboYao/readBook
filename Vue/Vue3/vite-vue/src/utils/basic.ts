export const extend = Object.assign

export const isBrowser = typeof window !== 'undefined'

export const isObject = (val: unknown): val is Record<any, any> => val !== null && typeof val === 'object'

export const isFunction = (val: unknown): val is Function => typeof val === 'function'

export const isPromise = <T = any>(val: unknown): val is Promise<T> => isObject(val) && isFunction(val.then) && isFunction(val.catch)

export function noop() {
// eslint-disable-next-line no-empty-function
}
