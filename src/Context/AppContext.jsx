import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

export default function AppProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);

  

  /*User for cookies only
  
  async function getUser() {
    try {
      
      const res = await axios.get("https://laravel-backend-production-d2e9.up.railway.app/api/user");
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
  }, []); */


  async function getUser() {

    try {
      const res = await axios("https://laravel-backend-production-d2e9.up.railway.app/api/user"
      ,{
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );

    const data = res.data;
    if (data) {
      console.log(data);
      setUser(data);
    }
    } catch (error) {
      if (error.response?.status === 401) {
        setUser(null);
      } else{
        console.error("Error fetching user:", error);
      }
    }
  }

  useEffect(() => {
    if (token) {
      getUser();
    } else {
      setUser(null); // Ensure user state is cleared when logging out
    }
  }, [token]);

  return (
    <AppContext.Provider value={{ user, token, setToken, setUser, getUser }}>
      {children}
    </AppContext.Provider>
  );
}
