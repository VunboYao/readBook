interface Date {
  name: string
  age: number
}

export default function (obj: Date): Number {
  console.log(obj.age)
  return obj.age
}