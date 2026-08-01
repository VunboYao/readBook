import { createBrowserRouter, isRouteErrorResponse, Link, useRouteError } from 'react-router'
import App from '@/App'


export default createBrowserRouter([
  {
    path: '/',
    Component: App,
    HydrateFallback: () => <div>Loading...</div>, // 懒加载首屏占位
    children: [
      {
        errorElement: <RootError />,
        children: [
          { index: true, lazy: () => import('@/views/home') },
          { path: 'detail', lazy: () => import('@/views/detail') },
          { path: 'entire', lazy: () => import('@/views/entire') }
        ]
      },
      {
        path: '*',
        lazy: () => import('@/views/not-found'),
      }
    ]
  },
])


export function RootError() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return <h1>{error.status} {error.statusText}</h1>
  }
  return (
    <div>
      <h1>出错了</h1>
      <Link className="text-blue-500" to="/">回首页</Link>
    </div>
  )
}