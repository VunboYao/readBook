import { createContext, memo, useContext, useEffect, useState, type ReactNode } from 'react'


const initial: Car[] = [
  { name: '宝马', price: 100000, count: 1 },
  { name: '奔驰', price: 200000, count: 2 },
  { name: '奥迪', price: 300000, count: 3 },
]
/** 自由练习：随便写 */
export function Practice10Sandbox() {
  const [cars, setCars] = useState<Car[]>(initial)

  const changeCount = (i: number) => {
    // setCars(cars.map((car, index) => index === i ? { ...car, count: car.count + 1 } : car))
    const newCars = [...cars]
    newCars[i].count += 1
    setCars(newCars)
    console.log(newCars);
  }

  return <>
    {cars.map((car, i) => (
    <>
      <Row
        key={car.name}
        car={car}
      />
      <button onClick={() => changeCount(i)}>+</button>
    </>
    ))}
  </>
}

type Car = {
  name: string
  price: number
  count: number
}
const Row = memo(function ({car}: {car: Car}) {
  return <div>
    <span>{car.name}</span>
    <span>{car.price}</span>
    <span>{car.count}</span>
  </div>
})