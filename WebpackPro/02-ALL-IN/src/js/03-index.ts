interface person {
  name: string
  age: number
  gender?: boolean
}

type Moo<T, K extends keyof T> = {
  [P in K]: T[P]
}

type xx = Moo<person, 'age'|'gender'>
