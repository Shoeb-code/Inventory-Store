import { Routes, Route, Navigate, Outlet } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import RoleBasedLayout from "./RoleBasedLayout";
import AuthLayout from "../layouts/AuthLayout";

// Auth Pages
import StoreAdminLogin from "../modules/auth/pages/StoreAdminLogin";
import SuperAdminLogin from "../modules/auth/pages/SuperAdminLogin";
import SuperAdminRegister from "../modules/auth/pages/SuperAdminRegister";
import ForgotPassword from "../modules/auth/pages/ForgotPassword";
import ResetPassword from "../modules/auth/pages/ResetPassword";
import VerifyOtp from "../modules/auth/pages/VerifyOtp";

// Admin Pages
import AdminDashboard from "../modules/admin/pages/AdminDashboard";
import CreateStore from "../modules/admin/pages/CreateStore";
import StoreList from "../modules/admin/pages/StoreList";
import StoreView from "../modules/admin/pages/StoreView";
import StoreDashboard from "../modules/storeAdmin/pages/StoreDashboard";
import InventoryTable from "../modules/storeAdmin/components/InventoryTable";
import Inventory from "../modules/storeAdmin/pages/Inventory";
import Reports from "../modules/storeAdmin/pages/Reports";
import Sales from "../modules/storeAdmin/pages/Sales";
import AddProduct from "../modules/storeAdmin/pages/AddProduct";
import InventoryDetails from "../modules/storeAdmin/pages/InventoryDetails";

export default function AppRoutes() {
  return (
    <Routes>

      {/* 🔐 AUTH */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<StoreAdminLogin />} />
        <Route path="/admin/login" element={<SuperAdminLogin />} />
        <Route path="/admin/register" element={<SuperAdminRegister />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
      </Route>

      {/* 🔒 MAIN PROTECTED LAYOUT */}
      <Route
        path="/"
        element={
          <ProtectedRoute allowedRoles={["SUPER_ADMIN", "STORE_ADMIN"]}>
            <RoleBasedLayout />
          </ProtectedRoute>
        }
      >

        {/* ================= SUPER ADMIN ================= */}
        <Route
          path="admin"
          element={
            <ProtectedRoute allowedRoles={["SUPER_ADMIN"]}>
              <Outlet />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="create-store" element={<CreateStore />} />
          <Route path="stores" element={<StoreList />} />
          <Route path="stores/:id" element={<StoreView />} />
        </Route>

        {/* ================= STORE ADMIN ================= */}
        <Route
          path="store"
          element={
            <ProtectedRoute allowedRoles={["STORE_ADMIN", "SUPER_ADMIN"]}>
              <Outlet />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<StoreDashboard />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="reports" element={<Reports />} />
          <Route path="sales" element={<Sales />} />
          <Route path="add-product" element={<AddProduct />} />

          <Route path="inventory-unit/:id" element={<InventoryDetails />} />
        </Route>

      </Route>

      {/* ❌ FALLBACK */}
     {/* <Route path="*" element={<Navigate to="/login" />} /> */}

    </Routes>
  );
}