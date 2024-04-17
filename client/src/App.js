import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
// import Admin from './components/Admin';
// import Seller from './components/Seller';
import UserPage from "./pages/UserPages/UserPage";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./auth/AuthContext";
import { UserRoute } from "./routes/UserRoute";

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
              <UserRoute>
                <UserPage />
              </UserRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
