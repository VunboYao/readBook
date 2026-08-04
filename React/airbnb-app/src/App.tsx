import { Outlet, ScrollRestoration, useNavigation } from "react-router";
import GlobalFeedback from "@/components/GlobalFeedback";
import AppHeader from "@/components/AppHeader";
import AppFooter from "@/components/AppFooter";

export default function App() {
  const navigation = useNavigation();
  const routeLoading = navigation.state === 'loading';

  return (<>
    <GlobalFeedback />
    {routeLoading && <div className="text-red-500 text-5xl">Loading...</div>}
    <div>
      <AppHeader />
      <div className="main">
        <Outlet />
      </div>
      <AppFooter />
      <ScrollRestoration />
    </div>
  </>)
}