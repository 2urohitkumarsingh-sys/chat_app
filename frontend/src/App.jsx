import { Navigate, Route, Routes } from "react-router-dom";
import ChatPage from "./pages/ChatPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import AdminDashboard from "./pages/AdminDashboard";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import PageLoader from "./components/PageLoader";
import GlobalBanner from "./components/GlobalBanner";
import {Toaster} from "react-hot-toast"

function App() {
  const {checkAuth, isCheckingAuth, authUser, getPublicSettings} = useAuthStore();

  useEffect(()=>{
    checkAuth();
    getPublicSettings();
  },[checkAuth, getPublicSettings]);
  
  if(isCheckingAuth) return <PageLoader />

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col relative overflow-hidden">
      {/* GLOBAL TOP HUD */}
      <GlobalBanner />

      <div className="flex-1 flex items-center justify-center p-4 relative">
        {/* DECORATORS - GRID BG & GLOW SHAPES */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />
        <div className="absolute top-0 -left-4 size-96 bg-pink-500 opacity-20 blur-[100px]" />
        <div className="absolute bottom-0 -right-4 size-96 bg-cyan-500 opacity-20 blur-[100px]" />

        <Routes>
          <Route path="/" element={ authUser ? <ChatPage/>:<Navigate to={"/login"} />} />
          <Route path="/login" element={!authUser ? <LoginPage/>:<Navigate to={"/"} />} />
          <Route path="/signup" element={!authUser ? <SignUpPage />:<Navigate to={"/"} />} />
          <Route path="/admin" element={authUser?.role === "admin" ? <AdminDashboard /> : <Navigate to="/" />} />
        </Routes>
      </div>

    <Toaster/>
    </div>
  )
}

export default App
