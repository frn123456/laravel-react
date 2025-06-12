import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

export default function AppProvider({ children }) {
  // const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);

  

  async function getUser() {
    try {
      
      const res = await axios.get("https://laravel-backend-production-e0d9.up.railway.app");
      setUser(res.data);
    } catch (error) {
      if (error.response?.status === 401) {
        setUser(null);
      } else{
        console.error("Error fetching user:", error);
      }
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  // async function getUser() {
  //   const res = await fetch("/api/user", {
  //     credentials: "include",
  //   });
  //   const data = await res.json();

  //   if (res.ok) {
  //     setUser(data);
  //   }
  // }

  // // Automatically fetch user data when the component mounts
  // useEffect(() => {
  //   getUser();
  // }, []); // Remove `token` dependency since we're using cookies

  // async function getUser() {
  //   const res = await fetch("/api/user", {
  //     headers: {
  //       authorization: `Bearer ${token}`,
  //     },
  //   });
  //   const data = await res.json();

  //   if (res.ok) {
  //     console.log(data);
  //     setUser(data);
  //   }
  // }

  // useEffect(() => {
  //   if (token) {
  //     getUser();
  //   } else {
  //     setUser(null); // Ensure user state is cleared when logging out
  //   }
  // }, [token]);

  return (
    <AppContext.Provider value={{ user, setUser, getUser }}>
      {children}
    </AppContext.Provider>
  );
}
