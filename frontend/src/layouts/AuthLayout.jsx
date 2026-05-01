import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import PageWrapper from "../components/animations/PageWrapper";
import AuthNavbar from "../components/common/AuthNavbar";

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex bg-[#1a1a19] relative overflow-hidden">
             <AuthNavbar />
      {/* 🌌 Animated Background Glow */}
      <motion.div
        animate={{ x: [0, 40, 0], y: [0, 20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-120px] left-[-120px] w-[350px] h-[350px] bg-blue-600/20 blur-3xl rounded-full"
      />

      

      {/* LEFT PANEL */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="hidden md:flex w-1/2 flex-col justify-center px-20 relative bg-[#040412]"
      >
        {/* Divider */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 h-[80%] w-[1px] bg-white/10"></div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-5xl font-semibold text-white leading-tight mb-6"
        >
          Smart Inventory <br />
          <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Management
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-gray-400 max-w-md text-lg leading-relaxed mb-8"
        >
          Track stock, manage stores, and monitor performance — built for speed, clarity, and control.
        </motion.p>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="space-y-3 text-gray-300 text-sm"
        >
          <p>✔ Real-time inventory tracking</p>
          <p>✔ Multi-store management</p>
          <p>✔ Transfer & analytics insights</p>
        </motion.div>
      </motion.div>

      {/* RIGHT PANEL */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-6 relative">

        <div className="w-full max-w-md">

          {/* 🔥 Animated Card Wrapper */}
          
            <PageWrapper>
              <Outlet />
            </PageWrapper>
          

        </div>

      </div>

    </div>
  );
}