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

function App() {
  return (
    <BrowserRouter>
      <SEO
        title="Falakey | Free Stock Photos (Beta)"
        description="Discover free high-quality stock photos and creative photography challenges on Falakey."
        name="Falakey"
        type="article"
      />
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
          <Route path="falakey-stars" element={<Stars />} />
          <Route path="auth/google" element={<GoogleCallback />} />
        </Route>

        <Route path=":locale/my-account" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="plans" element={<Plans />} />
          <Route path="listings" element={<ListingsDashboard />} />
          <Route path="messages" element={<MessagesDashboard />} />
          <Route
            path="notification-settings"
            element={<NotificationsDashboard />}
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
    <div dir={dir} className="relative h-full w-full">
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
    <div dir={dir} className="relative h-full w-full">
      <Navbar />
      <SideBar />
      <div className="max-w-[1400px] bg-white lg:pl-[70px] lg:pr-2 lg:mx-auto lg:pb-0 pb-[70px] mx-2 pt-[70px] flex flex-col gap-4">
        <Outlet />
        <DashboardFooter />
      </div>
    </div>
  );
}

export default App;
