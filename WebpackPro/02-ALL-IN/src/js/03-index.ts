interface person {
  name: string
  age: number
  gender?: boolean
}

type Moo<T, K extends keyof T> = {
  [P in K]: T[P]
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type xx = Moo<person, 'age' | 'gender'>
