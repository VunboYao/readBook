interface WidthInterface {
  width: number
}

interface HeightInterface {
  height: number
}

interface colorInterface {
  color: string
}

interface rectInterface extends WidthInterface, HeightInterface, colorInterface{
  border: string
}

let obj12:rectInterface = {
  width: 100,
  height: 200,
  color: 'red',
  border: '1'
}