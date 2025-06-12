import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [posts, setPosts] = useState([]);

  async function getPosts() {
    const res = await axios.get("https://laravel-backend-production-e0d9.up.railway.app/api/posts");
    const data = res.data;
    if (res.data) {
      setPosts(data);
    }
  }

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      <h1 className="title">Latest Post</h1>
      
      {posts.length > 0 ? (
        posts.map((post) => (
          <div className="post" key={post.id}>
            <div className="border-s-4 ps-3 border-blue-500 mb-7">
              <div>
              <h2 className="font-bold text-2xl">{post.title}</h2>
              <small>
                created by: {post.user.name} on {""}
                {new Date(post.created_at).toDateString()}
                <div className="mt-5 flex space-x-2">
                  <p>{post.body}</p>
                  <Link to={`/posts/${post.id}`} className="text-blue-600">
                    ...Read more
                  </Link>
                </div>
              </small>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No posts yet</p>
      )}
    </>
  );
}
