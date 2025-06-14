import { useContext } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import axios from "axios";

export default function Layout() {
  const { user, setUser } = useContext(AppContext);
  const { token, setToken } = useContext(AppContext);
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

  async function handleLogout(e) {
  e.preventDefault();
  try {
    const res = await axios.post(
      "https://laravel-backend-production-d2e9.up.railway.app/api/logout",
      {}, // Empty body
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = res.data;
    if (data) {
      setUser(null);
      setToken(null);
      navigate("/");
      alert(data);
    }
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
