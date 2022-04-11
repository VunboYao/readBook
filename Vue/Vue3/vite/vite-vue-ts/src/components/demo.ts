{
  type BooleanOrString = string | boolean
  type StringOrNumberArray<E> = [E] extends string | number ? E[] : E
  type WhatIsThis = StringOrNumberArray<string | boolean>
  type BooleanOrStringGot = BooleanOrString extends string | number
    ? BooleanOrString[]
    : BooleanOrString
  type GetNever = StringOrNumberArray<never>
}
{
  type GetSNums = never extends number
    ? number[]
    : never extends string
    ? string[]
    : never
}
{
  type UseFulNeverX<T> = T extends {} ? T[] : []
  type UselessNeverX<T, S> = S extends {} ? S[] : []
  type UseLessNeverY<T, S> = S extends {} ? T[] : []
  type UseLessNeverZ<T> = [T] extends [{}] ? T[] : []
  type ThisIsNeverX = UseFulNeverX<never>
  type ThisIsNotNeverX = UselessNeverX<never, string>
  type ThisIsNotNeverY = UseLessNeverY<never, string>
  type ThisIsNotNeverZ = UseLessNeverZ<never>
}
{
  type ElementTypeOfArray<T> = T extends (infer E)[] ? E : never
  type isNumber = ElementTypeOfArray<number[]>
  // type isNever = ElementTypeOfArray<number>
  type ElementTypeOfObj<T> = T extends { name: infer E; id: infer I }
    ? [E, I]
    : never
  type isArray = ElementTypeOfObj<{ name: 'name'; id: 1; age: 30 }> // [name, 1]
  type isNever = ElementTypeOfObj<number> // never
}

{
  interface MixedObject {
    animal: {
      type: 'animal' | 'dog' | 'cat'
      age: number
    }
    [name: number]: {
      type: string
      age: number
      nickname: string
    }
    [name: string]: {
      type: string
      age: number
    }
  }
  type animal = MixedObject['animal']
  type animalType = MixedObject['animal']['type']
  type numberIndex = MixedObject[number]
  type numberIndex0 = MixedObject[0]
  type stringIndex = MixedObject[string]
  type stringIndex0 = MixedObject['string']
  type MixedObjectKeys = keyof MixedObject
  type animalKeys = keyof animal
  type numberIndexKeys = keyof numberIndex
}
{
  const animal = {
    id: 1,
    name: 'animal',
  }
  type Animal = typeof animal
  const animalFun = () => animal
  type ANim = typeof animalFun
}

{
  type SpecifiedKeys = 'id' | 'name'
  type TargetType = {
    [key in SpecifiedKeys]: any
  }
  type TargetGeneric<O extends string | number | symbol> = {
    [key in O]: any
  }
  type TargetInstance = TargetGeneric<SpecifiedKeys>
  interface SI {
    readonly id: number
    name?: string
  }
  type TT = {
    [key in keyof SI]: SI[key]
  }
  type TGT<S> = {
    [key in keyof S]: S[key]
  }
  type TI = TGT<SI>
  type TGTA<S> = {
    [key in keyof S as Exclude<key, 'id'>]: S[key]
  }
  type TGTAS = TGTA<SI>
}

{
  type ESN = Exclude<1 | 2, 1>
  type ESS = Exclude<'id' | 'name', 'id'>
  type ESB = Exclude<boolean, true>
}

{
  type RetrunTypeOfResolved<F extends (...args: any) => any> = F extends (
    ...args: any
  ) => Promise<infer R>
    ? R
    : ReturnType<F>
  type isNumber = RetrunTypeOfResolved<() => number>
  type isString = RetrunTypeOfResolved<() => Promise<string>>
}

{
  type Merge<A, B> = {
    [key in keyof A | keyof B]: key extends keyof A
      ? key extends keyof B
        ? A[key] | B[key]
        : A[key]
      : key extends keyof B
      ? B[key]
      : never
  }
  type Merged = Merge<{ id: number; name: string }, { id: string; age: number }>
}

{
  type EqualV1<S, T> = S extends T ? (T extends S ? true : false) : false
  type ExampleV11 = EqualV1<1 | (number & {}), number>
  type ExampleV12 = EqualV1<never, never>

  type EqualV2<S, T> = [S] extends [T]
    ? [T] extends [S]
      ? true
      : false
    : false
  type ExampleV21 = EqualV2<1 | (number & {}), number>
  type ExampleV22 = EqualV2<never, never>
  type ExampleV23 = EqualV2<any, number>

  type IsAny<T> = 0 extends 1 & T ? true : false
  type EqualV3<S, T> = IsAny<S> extends true
    ? IsAny<T> extends true
      ? true
      : false
    : IsAny<T> extends true
    ? false
    : [S] extends [T]
    ? [T] extends [S]
      ? true
      : false
    : false
  type ExampleV31 = EqualV3<1 | (number & {}), number>
  type ExampleV32 = EqualV3<never, never>
  type ExampleV34 = EqualV3<any, any> // true
  type ExampleV33 = EqualV3<any, number> // false
  type ExampleV35 = EqualV3<never, any> // false
}
