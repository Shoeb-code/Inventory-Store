import { createContext, useContext, useState, useEffect } from "react";

// create context
const AuthContext = createContext();

// provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // check token on app load
  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      setUser({}); // later replace with API call
    }

    setLoading(false);
  }, []);

  // login
  const login = (data) => {
    localStorage.setItem("accessToken", data.accessToken);
    setUser(data.user);
  };

  // logout
  const logout = () => {
    localStorage.removeItem("accessToken");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// custom hook (clean usage 🔥)
export const useAuth = () => {
  return useContext(AuthContext);
};