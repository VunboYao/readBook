import { useEffect, useState } from 'react'

export default function useLocalStorage(key) {
  // 1.从localStorage中获取数据，并根据数据创建组件的state
  const [data, setData] = useState(() => {
    const item = localStorage.getItem(key)
    if (!item) { return '' }
    return JSON.parse(item)
  })

  // 2.监听data的改变，一旦发生改变就存储data最新值
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(data))
  }, [data, key])

  // 3.将data/setData导出给组件使用
  return [data, setData]
}
