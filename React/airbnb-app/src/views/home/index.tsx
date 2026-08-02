import { useSelector, useDispatch } from 'react-redux'
import { add, subtract } from '@/store/home.tsx'
import type { RootState, AppDispatch } from '@/store/index.tsx'
import { useEffect } from 'react'
import request from '@/api'

export function Component() {
  const currentPage = useSelector((state: RootState) => state.home.currentPage)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    // request.get('/home/highscore').then((res) => {
    //   console.log(res)
    // })
  }, [])

  return (
    <div className="flex flex-col items-center justify-center sm:w-200 xl:w-300 2xl:w-full">
      <h1 className="text-red-500 text-5xl">Home- {currentPage}</h1>
      <button
        className="text-blue-500 border-dashed mr-1 text-right w-20 rounded-sm p-2 border-2 border-blue-500 cursor-pointer"
        onClick={() => dispatch(add(1))}
      >Add</button>
      <button
        className="text-2xl bg-blue-500 dark:bg-red-500 text-white rounded-lg p-2 border-2 border-red-500 cursor-pointer"
        onClick={() => dispatch(subtract(1))}
      >Subtract</button>
      <p>Hello</p>
    </div>
  )
}