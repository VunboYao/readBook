import { Link, Outlet, ScrollRestoration, useNavigation } from "react-router";
import GlobalFeedback from "@/components/GlobalFeedback";

export default function App() {
  const navigation = useNavigation();
  const routeLoading = navigation.state === 'loading';

  return (<>
    <GlobalFeedback />
    {routeLoading && <div className="text-red-500 text-5xl">Loading...</div>}
    <nav className="flex gap-4 p-4">
      <Link to="/">Home</Link>
      <Link to="/detail">Detail</Link>
      <Link to="/entire">Entire</Link>
    </nav>
    <div>
      <div className="header text-airbnb cursor-pointer hover:text-blue-500 hover:underline text-2xl font-bold">
        header outlet AppHeader Component
      </div>
      <div className="main">
        <Outlet />
      </div>
      <div className="footer">
        footer outlet AppFooter Component
      </div>
      <ScrollRestoration />
    </div>
  </>)
}