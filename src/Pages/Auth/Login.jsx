import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import App from "../../App";
import { AppContext } from "../../Context/AppContext";
import axios from "axios";

export default function Login() {
  // const { setToken } = useContext(AppContext);
  const { setUser } = useContext(AppContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  axios.defaults.withCredentials = true;

  async function handleLogin(e) {
    e.preventDefault(); // Prevent page reload
    try {
      // Ensure CSRF token is set
         // 1️⃣ Get CSRF cookie first (required by Sanctum)
      await axios.get(
        "https://laravel-backend-production-d2e9.up.railway.app/sanctum/csrf-cookie",
        {
          withCredentials: true,
        }
      );

      // Send login request
      const res = await axios.post("https://laravel-backend-production-d2e9.up.railway.app/api/login", formData);
      const data = res.data;
      if (data) {
        setUser(data.user); // ✅ Update user state immediately
        navigate("/"); // Redirect after login
        alert("Login successful!");
      }
    } catch (error) {
      if (error.response?.data?.errors) {
        setErrors(
          error.response.data.errors);
      } else {
        console.error("Login error:", error);
      }
    }
  }

  // async function handleLogin(e) {
  //   e.preventDefault();
  //   const res = await fetch("/api/login", {
  //     method: "POST",
  //     body: JSON.stringify(formData),
  //   });
  //   const data = await res.json();
  //   if (data.errors) {
  //     setErrors(data.errors);
  //   } else {
  //     localStorage.setItem("token", data.token);
  //     setToken(data.token);
  //     navigate("/");
  //     console.log(data);
  //   }
  // }

  return (
    <>
      <h1 className="title">Login your account</h1>
      <form onSubmit={handleLogin} className="space-y-5 w-1/2 mx-auto">
        <div>
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email[0]}</p>
          )}
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password[0]}</p>
          )}
        </div>

        <button className="primary-btn">Login</button>
      </form>
    </>
  );
}
