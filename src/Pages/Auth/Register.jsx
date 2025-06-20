import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import App from "../../App";
import { AppContext } from "../../Context/AppContext";
import axiosClient from "../../Reusables/axiosClient";;
import { setAccessToken } from "../../Reusables/auth";

export default function Register() {
  const { setUser } = useContext(AppContext);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  async function handleRegister(e) {
    e.preventDefault();
    try {
      const res = await axiosClient.post(
        "/register",
        formData
      );
      /* const res = await axios.post(
         "/api/register",
        formData
      ) */;
      const data = res.data;
      if (data?.message) {
        alert(data.message);
      }
      setUser(data.user);
      setAccessToken(data.token);
      // setToken(data.token);
      navigate("/");
      console.log(data);
    } catch (error) {
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
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
          {errors.name && <p className="error">{errors.name?.[0]}</p>}
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
          {errors.email && <p className="error">{errors.email?.[0]}</p>}
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
          {errors.password && <p className="error">{errors.password?.[0]}</p>}
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
