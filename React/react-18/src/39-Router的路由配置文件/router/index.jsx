import { Navigate } from 'react-router-dom'
import Home from '../pages/Home'
import HomeRecommend from '../pages/HomeRecommend'
import HomeRanking from '../pages/HomeRanking'
import HomeSongList from '../pages/HomeSongList'
import About from '../pages/About'
import Login from '../pages/Login'
import Category from '../pages/Category'
import Order from '../pages/Order'
import NotFound404 from '../pages/NotFound404'

const routes = [
  {
    path: '/',
    element: <Navigate to={'/home'}/>,
  },
  {
    path: '/home',
    element: <Home/>,
    children: [
      { path: '/home', element: <Navigate to={'recommend'}/> },
      { path: 'recommend', element: <HomeRecommend/> },
      { path: 'ranking', element: <HomeRanking/> },
      { path: 'songList', element: <HomeSongList/> },
    ],
  },
  {
    path: '/about',
    element: <About/>,
  },
  {
    path: '/login',
    element: <Login/>,
  },
  {
    path: '/category/:id',
    element: <Category/>,
  },
  {
    path: '/order',
    element: <Order/>,
  },
  {
    path: '*',
    element: <NotFound404/>,
  },
]

export default routes
