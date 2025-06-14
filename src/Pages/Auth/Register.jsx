import { useState } from "react";
import { useNavigate } from "react-router-dom";
import App from "../../App";
import { AppContext } from "../../Context/AppContext";
import axios from "axios";
import { useContext } from "react";
import FieldError from "../../Components/FieldError";
import useLaravelErrors from "../../Reusables/useLaravelErrors";

export default function Register() {
  // const {setToken} = useContext(AppContext);
  const { errors, capture, clear } = useLaravelErrors();
  const navigate = useNavigate();
  const { setUser } = useContext(AppContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

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
  axios.defaults.withCredentials = true;

  async function handleRegister(e) {
    e.preventDefault();

    try {
      // 1️⃣ Get CSRF cookie first (required by Sanctum)
      await axios.get(
        "https://laravel-backend-production-d2e9.up.railway.app/sanctum/csrf-cookie",
        {
          withCredentials: true,
        }
      );
      // Send register request
      const res = await axios.post(
        "https://laravel-backend-production-d2e9.up.railway.app/api/register",
        formData
      );

      // Extract user data (NO need for .json())
      const data = res.data;
      if (data) {
        setUser(data.user);
        navigate("/");
        alert("Registration successful!");
      }
    } catch (error) {
      capture(error);
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
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value });
              clear("name");
            }}
          />
          <FieldError errors={errors} field="name" />
        </div>
        <div>
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
             onChange={(e) => {
              setFormData({ ...formData, email: e.target.value });
              clear("email");
            }}
          />
          <FieldError errors={errors} field="email" />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
             onChange={(e) => {
              setFormData({ ...formData, password: e.target.value });
              clear("password");
            }}
          />
          <FieldError errors={errors} field="password" />
        </div>
        <div>
          <input
            type="password"
            placeholder="Confirm Password"
            value={formData.password_confirmation}
           onChange={(e) => {
              setFormData({ ...formData, password_confirmation: e.target.value });
              clear("password_confirmation");
            }}
          />
        </div>

        <button className="primary-btn">Register</button>
      </form>
    </>
  );
}
