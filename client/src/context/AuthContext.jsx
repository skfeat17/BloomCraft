import { createContext, useContext, useState, useEffect } from "react";
import {getCurrentUserHandler, loginHandler,logoutHandler,registerHandler,sendOtpHandler,verifyEmailHandler} from '../api/auth'
// 1️⃣ Create context
export const AuthContext = createContext();

// 2️⃣ AuthProvider component
export const AuthProvider = ({ children }) => {
  const [isError, setIsError] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("accessToken")||null);
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);
  // If token exists, mark user as authenticated
  useEffect(() => {
    setIsAuthenticated(!!user || !!token);
    setIsError(false);
    setMessage(null);
  
  }, [user, token]);



  // Login function
  const loginUser = async (identifier, password) => {
   console.log("Attempting login with identifier:", identifier);
   setLoading(true);
   const data = await loginHandler(identifier, password);
   setLoading(false);
    if (data.ok) {
      setUser(data.data.user);
      setToken(data.data.accessToken);
      localStorage.setItem("user", JSON.stringify(data.data.user));
      localStorage.setItem("accessToken", data.data.accessToken);
      setIsAuthenticated(true);
    }
    return data;
  };
 
  const registerUser = async (firstname, lastname,username, email, password) => {
    setLoading(true);
    const data = await registerHandler(firstname, lastname,username, email, password);
    setLoading(false);
    if(data.ok){
      setUser(data.data.user);
      setToken(data.data.accessToken);
      localStorage.setItem("user", JSON.stringify(data.data.user));
      localStorage.setItem("accessToken", data.data.accessToken);
      setIsAuthenticated(true);
    }
    return data;

  } 

  const logoutUser = async () => {
    setLoading(true);
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    setIsAuthenticated(false);
    const data = await logoutHandler(token);
    setLoading(false);
    return data;
  };

const currentUser = async () => {
   setLoading(true);
   const data = await getCurrentUserHandler();
   setLoading(false);
    return data;
  };

const sendOtp = async (email) => {
    setLoading(true);
    const data = await sendOtpHandler(email);
    setLoading(false);
    return data;
  }
const verifyEmail = async (otp) => {
    setLoading(true);
    const data = await verifyEmailHandler(otp);
    setLoading(false);
    return data;
  }





  // 5️⃣ Provide all values
  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        loading,
        message,
        loginUser,
        registerUser,
        logoutUser,
        currentUser,
        sendOtp,
        verifyEmail,
        isError
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// 6️⃣ Hook to use Auth context
export const useAuth = () => useContext(AuthContext);