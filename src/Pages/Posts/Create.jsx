import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";
import axios from "axios";

export default function Create() {
  const navigate = useNavigate();
  // const { token } = useContext(AppContext);
  const [formData, setFormData] = useState({
    title: "",
    body: "",
  });

  axios.defaults.withCredentials = true;

  const [errors, setErrors] = useState({});

  async function handleCreate(e) {
    e.preventDefault();

    try {
      const res = await axios.post("https://laravel-backend-production-d2e9.up.railway.app/api/posts", formData);
      const data = res.data;
      if (data) {
        navigate("/");
        console.log(data);
      }
    } catch (error) {
      if (error.response?.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        console.error("Create post error:", error);
      }
    }
  }

  return (
    <>
      <h1 className="title">Create Post</h1>

      <form onSubmit={handleCreate} className="space-y-5 w-1/2 mx-auto">
        <div>
          <input
            type="text"
            placeholder="Post Title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          {errors.title && <p className="error">{errors.title?.[0]}</p>}
        </div>
        <div>
          <textarea
            rows="6"
            placeholder="Post Body"
            value={formData.body}
            onChange={(e) => setFormData({ ...formData, body: e.target.value })}
          />
          {errors.body && <p className="error">{errors.body?.[0]}</p>}
        </div>
        <button className="primary-btn">Submit</button>
      </form>
    </>
  );
}
