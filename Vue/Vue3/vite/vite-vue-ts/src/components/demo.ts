{
  // !接口类型
  interface Person {
    name: string
    age?: number
    weight?: number
  }
  /*   type Partial<T> = {
    [P in keyof T]?: T[P]
  }
  type PartialPerson = Partial<Person> */

  /* type Required<T> = {
    [P in keyof T]?: T[P]
  }
  type RequiredPerson = Required<Person> */

  /* type Readonly<T> = {
    readonly [P in keyof T]: T[P]
  }
  type ReadonlyPerson = Readonly<Person> */

  type Pick<T, K extends keyof T> = {
    [P in K]: T[P]
  }
  type NerPerson = Pick<Person, 'name' | 'age'>

  /* // type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>
  type Omit<T, K extends string | number | symbol> = {
    [P in Exclude<keyof T, K>]: T[P]
  }
  type NewPerson = Omit<Person, 'weight'> */
}

{
  // !联合类型
  interface Person {
    name: string
    age?: number
    weight?: number
  }
  /* type Exclude<T, U> = T extends U ? never : T
  type T = Exclude<'a' | 'b' | 'c', 'a'>
  // type NerPerson = Omit<Person, 'weight'>
  // 相当于
  type NerPerson = Pick<Person, Exclude<keyof Person, 'weight'>>
  // 其中
  type Excludekeys = Exclude<keyof Person, 'weight'> // => 'name'|'age' */

  /*   type Extract<T, U> = T extends U ? T : never
  type T = Extract<'a' | 'b' | 'c', 'a'> //=> 'a'
  // 相当于 交集
  type X = ('a' | 'b' | 'c') & 'a'

  type Intersect<T, U> = {
    [K in Extract<keyof T, keyof U>]: T[K]
  }
  interface NewPerson {
    name: string
    age?: number
  }
  type T1 = Intersect<Person, NewPerson> */

  // type NonNullable<T> = T extends null | undefined ? never : T
  // 等价于
  /* type NonNullable<T> = Exclude<T, null | undefined>
  type T = NonNullable<'a' | null | 'b' | undefined> */

  type Record<K extends keyof any, T> = {
    [P in K]: T
  }

  type MenuKey = 'home' | 'about' | 'more'
  interface Menu {
    label: string
    hidden?: boolean
  }
  const menus: Record<MenuKey, Menu> = {
    about: { label: 'about' },
    home: { label: 'home' },
    more: { label: 'more', hidden: true },
  }
  type T = keyof any // => string | number | symbol
}

{
  // !函数类型
  /* type ConstructorParameters<T extends new (...args: any) => any> =
    T extends new (...args: infer P) => any ? P : never */
  /* class Person {
    constructor(name: string, age?: number) {}
  }
  type dd = typeof Person
  type T = ConstructorParameters<typeof Person> */
  /* type Parameters<T extends (...args: any) => any> = T extends (
    ...args: infer P
  ) => any
    ? P
    : never
  type T0 = Parameters<() => void>
  type T1 = Parameters<(x: number, y?: number) => void> */
  /* type ReturnType<T extends (...args: any) => any> = T extends (
    ...args: any
  ) => infer R
    ? R
    : any
  type To = ReturnType<() => void>
  type T1 = ReturnType<() => string> */
  /* type ThisParameterType<T> = T extends (this: infer U, ...args: any[]) => any
    ? U
    : unknown
  type T = ThisParameterType<(this: number, x: number) => void> */
  /*   type ObjectDescription<D, M> = {
    data?: D
    methods?: M & ThisType<D & M>
  }
  function makeObject<D, M>(desc: ObjectDescription<D, M>): D & M {
    const data: object = desc.data || {}
    const methods: object = desc.methods || {}
    return { ...data, ...methods } as D & M
  }
  const obj = makeObject({
    data: { x: 0, y: 0 },
    methods: {
      moveBy(dx: number, dy: number) {
        this.x += dx
        this.y += dy
      },
    },
  })
  obj.x = 10
  obj.y = 20
  obj.moveBy(5, 5) */
  /* type OmitThisParameter<T> = unknown extends ThisParameterType<T>
    ? T
    : T extends (...args: infer A) => infer R
    ? (...args: A) => R
    : T
  type T = OmitThisParameter<(this: number, x: number) => string> */
}

{
  //!字符串类型
  // type Uppercase<S extends string> = intrinsic
  // type Lowercase<S extends string> = intrinsic
  // type Capitalize<S extends string> = intrinsic
}
