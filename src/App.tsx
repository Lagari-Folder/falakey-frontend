import {
  BrowserRouter,
  Outlet,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home";
import Explore from "./components/Explore/Explore";
import Footer from "./components/Layout/Footer";
import PictureDetail from "./pages/PictureDetail";
import Author from "./pages/Author";
import Challenge from "./pages/Challenge";
import ChallengeDetails from "./components/Challenge/ChallengeDetails";
import { License } from "./pages/License";
import { Stars } from "./pages/Stars";
import Collections from "./pages/Collections";
import CollectionExplore from "./pages/CollectionExplore";
import PageNotFound from "./pages/PageNotFound";
import Dashboard from "./pages/Dashboard";
import SideBar from "./components/Layout/SideBar";
import MessagesDashboard from "./pages/MessagesDashboard";
import ListingsDashboard from "./pages/ListingsDashboard";
import NotificationsDashboard from "./pages/NotificationsDashboard";
import AccountDetailsDashboard from "./pages/AccountDetailsDashboard";
import DashboardFooter from "./components/Layout/DashboardFooter";
import GoogleCallback from "./pages/GoogleCallback";
import Navbar from "./components/Layout/Navbar";
import DownloadsDashboard from "./pages/DownloadsDashboard";
import SEO from "./components/Common/SEO";
import { useSelector } from "react-redux";
import { RootState } from "./lib/store";
import SearchTabs from "./components/SearchTabs";
import Plans from "./pages/Plans";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import NotificationSettingsDashboard from "./pages/NotificationSettingsDashboard";

function App() {
  return (
    <BrowserRouter>
      <SEO />
      <Routes>
        <Route path="/:locale" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="explore" element={<Explore />} />
          <Route path="collections" element={<Collections />} />
          <Route
            path="collection/:collection"
            element={<CollectionExplore />}
          />
          <Route path="listing/:picture" element={<PictureDetail />} />
          <Route path="author/:username" element={<Author />} />
          <Route path="challenge" element={<Challenge />} />
          <Route path="challenge/:slug" element={<ChallengeDetails />} />
          <Route path="license" element={<License />} />
          <Route path="terms-and-conditions" element={<Terms />} />
          <Route path="privacy-policy" element={<Privacy />} />
          <Route path="falakey-stars" element={<Stars />} />
          <Route path="auth/google" element={<GoogleCallback />} />
        </Route>

        <Route path=":locale/my-account" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="plans" element={<Plans />} />
          <Route path="listings" element={<ListingsDashboard />} />
          <Route path="messages" element={<MessagesDashboard />} />
          <Route path="notification" element={<NotificationsDashboard />} />
          <Route
            path="notification-settings"
            element={<NotificationSettingsDashboard />}
          />
          <Route path="account-details" element={<AccountDetailsDashboard />} />
          <Route path="downloads" element={<DownloadsDashboard />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

function MainLayout() {
  const { dir } = useSelector((state: RootState) => state.translation);
  const location = useLocation();

  // Detect home page ("/", "/en", "/ar")
  const isHomePage = ["/", "/en", "/ar"].includes(
    location.pathname.replace(/\/+$/, "")
  );
  return (
    <div
      dir={dir}
      className="relative flex flex-col justify-between h-full min-h-[100vh] w-full"
    >
      <Navbar />
      <div className="bg-white pt-[70px]">
        {isHomePage ? null : <SearchTabs />}
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

function AdminLayout() {
  const { dir } = useSelector((state: RootState) => state.translation);

  return (
    <div
      dir={dir}
      className="relative flex flex-col items-center justify-between h-full min-h-[100vh]"
    >
      <Navbar />
      <SideBar />
      <div className="max-w-[1400px] h-screen bg-white w-full lg:pb-0 pb-[70px] pt-[70px] flex flex-col justify-between items-center gap-4">
        <Outlet />
        <DashboardFooter />
      </div>
    </div>
  );
}

export default App;
