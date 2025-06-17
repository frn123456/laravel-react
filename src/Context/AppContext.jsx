import { createContext, useEffect, useState } from "react";
import axiosClient from "../Reusables/axiosClient"; // ✅ Use preconfigured Axios with auth
import { getAccessToken } from "../Reusables/auth"; // ✅ Access token stored in memory

export const AppContext = createContext();

export default function AppProvider({ children }) {
  const [user, setUser] = useState(null);

  async function getUser() {
    try {
      const res = await axiosClient.get("/user"); // ✅ Auth handled by interceptor
      const data = res.data;
      if (data) {
        setUser(data);
      }
    } catch (error) {
      if (error.response?.status === 401) {
        setUser(null);
      } else {
        console.error("Error fetching user:", error);
      }
    }
  }

  useEffect(() => {
    if (getAccessToken()) {
      getUser();
    } else {
      setUser(null); // Clear user if token doesn't exist
    }
  }, []); // ✅ No need to track token as state anymore

  return (
    <AppContext.Provider value={{ user, setUser, getUser }}>
      {children}
    </AppContext.Provider>
  );
}
