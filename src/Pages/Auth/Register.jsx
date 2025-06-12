import { useState } from "react";
import { useNavigate } from "react-router-dom";
import App from "../../App";
import { AppContext } from "../../Context/AppContext";
import axios from "axios";
import { useContext } from "react";

export default function Register() {
  // const {setToken} = useContext(AppContext);
  const navigate = useNavigate();
  const { setUser } = useContext(AppContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [errors, setErrors] = useState({});

  // async function handleRegister(e) {
  //   e.preventDefault();
  //   const res = await fetch("/api/register", {
  //     method: "POST",
  //     body: JSON.stringify(formData),
  //   });
  //   const data = await res.json();
  //   if (data.errors) {
  //     setErrors(data.errors);
  //   }else{
  //     localStorage.setItem("token", data.token);
  //     setToken(data.token);
  //     navigate("/");
  //     console.log(data);

  //   }
  // }

  async function handleRegister(e) {
    e.preventDefault();

    try {
      // Send register request
      const res = await axios.post("https://laravel-backend-production-703c.up.railway.app/api/register", formData);

      // Extract user data (NO need for .json())
      const data = res.data;
      if (data) {
        setUser(data.user);
        navigate("/");
        console.log(data);
      }
    } catch (error) {
      if (error.response && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        console.error("Registration error:", error);
      }
    }
  }

  return (
    <>
      <h1 className="title">Register new account</h1>
      <form onSubmit={handleRegister} className="space-y-5 w-1/2 mx-auto">
        <div>
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name?.[0]}</p>
          )}
        </div>
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
            <p className="text-red-500 text-sm">{errors.email?.[0]}</p>
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
            <p className="text-red-500 text-sm">{errors.password?.[0]}</p>
          )}
        </div>
        <div>
          <input
            type="password"
            placeholder="Confirm Password"
            value={formData.password_confirmation}
            onChange={(e) =>
              setFormData({
                ...formData,
                password_confirmation: e.target.value,
              })
            }
          />
        </div>

        <button className="primary-btn">Register</button>
      </form>
    </>
  );
}
