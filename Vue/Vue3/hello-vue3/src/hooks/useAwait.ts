import { resolve } from "path"

export const useAwait = (time = 3000) => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}
