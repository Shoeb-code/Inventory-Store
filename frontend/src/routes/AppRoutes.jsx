import { BrowserRouter, Routes, Route } from "react-router-dom";

import AuthLayout from "../modules/auth/components/AuthLayout";

// Pages
import Register from "../modules/auth/pages/Register";
import VerifyOtp from "../modules/auth/pages/VerifyOtp";
import Login from "../modules/auth/pages/Login";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Auth Layout */}
        <Route path="/" element={<AuthLayout />}>

          <Route path="register" element={<Register />} />
          <Route path="verify" element={<VerifyOtp />} />
          <Route path="login" element={<Login />} />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}