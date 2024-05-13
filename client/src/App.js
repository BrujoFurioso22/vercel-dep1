import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
// import Admin from './components/Admin';
// import Seller from './components/Seller';
import UserRoutes from "./pages/PaginasPadre/UserRoutes";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./auth/AuthContext";
import { UserPR } from "./routes/UserPR";
import { SellerPR } from "./routes/SellerPR";
import SellerRoutes from "./pages/PaginasPadre/SellerRoutes";
import { AdminPR } from "./routes/AdminPR";
import AdminRoutes from "./pages/PaginasPadre/AdminRoutes";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/admin/*" element={<Admin />} />
        <Route path="/seller/*" element={<Seller />} /> */}
          <Route
            path="/user/*"
            element={
              <UserPR>
                <UserRoutes />
              </UserPR>
            }
          />
          <Route
            path="/seller/*"
            element={
              <SellerPR>
                <SellerRoutes />
              </SellerPR>
            }
          />
          <Route
            path="/adm/*"
            element={
              <AdminPR>
                <AdminRoutes />
              </AdminPR>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
