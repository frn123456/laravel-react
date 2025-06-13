import {  useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";
import axios from "axios";

export default function Show() {
  // const { token } = useContext(AppContext);
  const [post, setPost] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const [formData, setFormData] = useState({
    title: "",
    body: "",
  });

  const [errors, setErrors] = useState({});
  const [showUpdateForm, setShowUpdateForm] = useState(false); // Controls form visibility

  async function getPost() {
    const res = await axios.get(`https://laravel-backend-production-d2e9.up.railway.app/api/posts/${id}`);
    const data = res.data;

    setPost(data.post);
    setFormData({ title: data.post.title, body: data.post.body }); // Pre-fill form
  }

  // async function handleDelete(e) {
  //   e.preventDefault();
  //   const res = await axios.delete(`/api/posts/${id}`, {
  //     method: "DELETE",
  //     headers: {
  //       authorization: `Bearer ${token}`,
  //     },
  //   });
  //   if (res.ok) {
  //     setPost(null);
  //     navigate("/");
  //   }
  // }

   async function handleDelete(e) {
    e.preventDefault();

    try {
        // 1️⃣ Get CSRF cookie first (required by Sanctum)
      await axios.get(
        "https://laravel-backend-production-d2e9.up.railway.app/sanctum/csrf-cookie",
        {
          withCredentials: true,
        }
      );
      
      const res = await axios.delete(`/api/posts/${id}`);
      const data = res.data;
      if (data) {
        navigate("/");
        console.log(data);
      }
    } catch (error) {
      if (error.response?.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        console.error("Delete post error:", error);
      }
    }
  }

  async function handleUpdate(e) {
    e.preventDefault();

    try {
        // 1️⃣ Get CSRF cookie first (required by Sanctum)
      await axios.get(
        "https://laravel-backend-production-d2e9.up.railway.app/sanctum/csrf-cookie",
        {
          withCredentials: true,
        }
      );
      
      const res = await axios.put(`/api/posts/${id}`, formData);
      const data = res.data;
      if (data) {
        navigate("/");
        console.log(data);
      }
    } catch (error) {
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        console.error("Update post error:", error);
      }
    }
  }

  
  useEffect(() => {
    getPost();
  }, []);

  return (
    <>
      <h1 className="title">Post</h1>
      {post ? (
        <div className="post relative" key={post.id}>
          <div className="border-s-4 ps-3 border-blue-500 mb-7">
            <h2 className="font-bold text-2xl">{post.title}</h2>
            <small>
              created by: {post.user.name} on {""}
              {new Date(post.created_at).toDateString()}
              <p className="mt-5">{post.body}</p>
            </small>
          </div>
          <div className="flex space-x-2">
            <form onSubmit={handleDelete}>
              <button
                type="submit"
                className="border border-red-500 px-2 py-1 text-red-500 font-bold"
              >
                Delete
              </button>
            </form>
            <button
              className="border border-blue-500 px-2 py-1 text-blue-500 font-bold"
              onClick={() => setShowUpdateForm(!showUpdateForm)} // Toggle form visibility
            >
              Update
            </button>
          </div>

          {/* Update Form */}
          {showUpdateForm && (
            <form
              onSubmit={handleUpdate}
              className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 "
            >
              <div className="w-1/2 p-6 bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold mb-5">Edit Post</h2>
                <div className="space-y-3">
                  <div>
                    <input
                      type="text"
                      placeholder="Post Title"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                    />
                    {errors.title && <p className="error">{errors.title}</p>}
                  </div>
                  <div>
                    <textarea
                      rows="6"
                      placeholder="Post Body"
                      value={formData.body}
                      onChange={(e) =>
                        setFormData({ ...formData, body: e.target.value })
                      }
                    />
                    {errors.body && <p className="error">{errors.body}</p>}
                  </div>
                  <div className="space-y-2">
                    <button className="primary-btn">Submit</button>
                    <button
                      onClick={() => setShowUpdateForm(false)}
                      className="secondary-btn"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </form>
          )}
        </div>
      ) : (
        <p>No posts yet</p>
      )}
    </>
  );
}
