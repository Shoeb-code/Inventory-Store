import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import AuthLayout from "../layouts/AuthLayout";

import SuperAdminLogin from "../modules/auth/pages/SuperAdminLogin";
import SuperAdminRegister from "../modules/auth/pages/SuperAdminRegister";
import VerifyOtp from "../modules/auth/pages/VerifyOtp";
import ForgotPassword from "../modules/auth/pages/ForgotPassword";
import ResetPassword from "../modules/auth/pages/ResetPassword";

export default function AppRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>

        {/* AUTH LAYOUT */}
        <Route element={<AuthLayout />}>

          <Route path="/login" element={<SuperAdminLogin />} />
          <Route path="/register" element={<SuperAdminRegister />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path ="/forgot-password" element={<ForgotPassword/>} />
          <Route path ="/reset-password" element={<ResetPassword/>} />
        </Route>

      </Routes>
    </AnimatePresence>
  );
}