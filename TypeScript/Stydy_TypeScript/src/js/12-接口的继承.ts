// 接口的继承
// TS中的接口和JS中的类一样是可以继承的
interface WidthInterface {
  width: number
}

interface HeightInterface {
  height: number
}

interface colorInterface {
  color: string
}

// TODO： 利用 extends 继承接口
interface rectInterface extends WidthInterface, HeightInterface, colorInterface {
  border: string
}

let obj12: rectInterface = {
  width: 100,
  height: 200,
  color: 'red',
  border: '1',
}
