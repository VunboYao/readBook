import { Link, Outlet, ScrollRestoration, useNavigation } from "react-router";

export default function App() {
  const navigation = useNavigation();
  const loading = navigation.state === 'loading';

  return (<>
    {loading && <div className="text-red-500 text-5xl">Loading...</div>}
    <nav className="flex gap-4 p-4">
      <Link to="/">Home</Link>
      <Link to="/detail">Detail</Link>
      <Link to="/entire">Entire</Link>
    </nav>
    <div>
      <div className="header text-red-500 cursor-pointer hover:text-blue-500 hover:underline text-2xl font-bold">
        header component
      </div>
      <div className="main">
        <Outlet />
      </div>
      <div className="footer">
        footer component
      </div>
      <ScrollRestoration />
    </div>
  </>)
}