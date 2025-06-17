import { useContext } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import { setAccessToken } from "../Reusables/auth";
import axiosClient from "../Reusables/axiosClient";

export default function Layout() {
  const { user, setUser } = useContext(AppContext);

  const navigate = useNavigate();

  // async function handleLogout(e) {
  //   e.preventDefault();
  //   const res = await axios.post("/api/logout", {
  //     method: "POST",
  //     headers: {
  //       authorization: `Bearer ${token}`,
  //     },
  //   });
  //   const data = await res.json();
  //   console.log(data);

  //   if (res.ok) {
  //     localStorage.removeItem("token");
  //     setUser(null);
  //     setToken(null);
  //     navigate("/");
  //   }
  // }

   async function handleLogout() {
    try {
      // Call backend to clear refresh token cookie
      await axiosClient.post("/logout");

      // Clear in-memory access token
      setAccessToken(null);

      // Clear frontend user state
      setUser(null);

      // Redirect to login page
      navigate("/login");

      console.log("Logged out successfully");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  return (
    <>
      <header>
        <nav>
          <Link to="/" className="nav-link">
            Home
          </Link>
          {user ? (
            <div className="flex items-center space-x-6">
              <p className="text-slate-400 text-sm">Hello, {user.name}</p>
              <form onSubmit={handleLogout}>
                <button className="nav-link">Logout</button>
              </form>
              <Link to="/create" className="nav-link">
                Create Post
              </Link>
            </div>
          ) : (
            <div className="space-x-4">
              <Link to="/login" className="nav-link">
                Login
              </Link>
              <Link to="/register" className="nav-link">
                Register
              </Link>
            </div>
          )}
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
    </>
  );
}
