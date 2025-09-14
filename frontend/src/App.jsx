import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import SignUpPage from "./pages/SignUp.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import NofiticationPage from "./pages/NotificationsPage.jsx";
import CallPage from "./pages/CallPage.jsx";
import ChatPage from "./pages/ChatPage.jsx";
import toast, { Toaster } from "react-hot-toast";
import PageLoader from "./components/PageLoader.jsx";
import { getAuthUser } from "./lib/api.js";
import useAuthUser from "./hooks/useAuthUser.js";
import OnboardingPage from "./pages/OnBoardingPage.jsx";
import Layout from "./components/Layout.jsx";
import { useThemeStore } from "./store/useThemeStore.js";
import NotificationsPage from "./pages/NotificationsPage.jsx";
// import Layout from "./components/Layout.jsx";

const App = () => {
  const { isLoading, authUser } = useAuthUser();
  const {theme,setTheme} = useThemeStore();

  const isAuthenticated = Boolean(authUser);
  console.log("IsAuthenticated : ", isAuthenticated)
  const isOnboarded = authUser?.isOnboarded;

  console.log("IsOnboarded : ", isOnboarded)
  if (isLoading) return <PageLoader />;

  // Zustand for state management
  return (
    <div className=" h-screen text-xl " data-theme={theme}>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated && isOnboarded ? (
              <Layout showSidebar={true}>
                <HomePage />
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />
        <Route
           path="/signup"
          element={
            !isAuthenticated ? <SignUpPage /> : <Navigate to={isOnboarded ? "/" : "/onboarding"} />
          }
        />
        <Route
          path="/login"
          element={
            !isAuthenticated ? <LoginPage /> : <Navigate to={isOnboarded ? "/" : "/onboarding"} />
          }
        />
         <Route
          path="/notifications"
          element={
            isAuthenticated && isOnboarded ? (
              <Layout showSidebar={true}>
                <NotificationsPage />
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />
        <Route
          path="/call"
          element={isAuthenticated ? <CallPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/chat/:id"
          element={
            isAuthenticated && isOnboarded ? (
              <Layout showSidebar={false}>
                <ChatPage />
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />
        <Route
          path="/onboarding"
          element={
            isAuthenticated ? (
              !isOnboarded ? (
                <OnboardingPage />
              ) : (
                <Navigate to="/" />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
      <Toaster />
    </div>
  );
};
export default App;
