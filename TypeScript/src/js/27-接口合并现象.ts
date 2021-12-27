// 接口合并现象 todo: 当定义了多个同名的接口时，多个接口的内容会自动合并
interface PersonInterface27 {
  string: number
}

interface PersonInterface27 {
  gender: string
}


class Person27 implements PersonInterface27 {
  string: number = 123
  gender: string = 'male'
}
