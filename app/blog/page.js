"use client";
import { useEffect, useState } from "react";

export default function BlogPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost/backend/get-posts.php")
      .then(res => res.json())
      .then(data => setPosts(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ maxWidth: "1200px", margin: "40px auto", padding: "20px" }}>
      <h1 style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "30px", textAlign: "center", color: "#dc2626" }}>Blog</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" }}>
        {posts.map(post => (
          <div key={post.id} style={{ border: "1px solid #e5e7eb", borderRadius: "12px", backgroundColor: "#f9fafb", boxShadow: "0 2px 6px rgba(0,0,0,0.1)", overflow: "hidden", transition: "transform 0.3s, box-shadow 0.3s" }}
            className="blog-card">
            {post.image_url && <img src={`http://localhost/backend/uploads/${post.image_url}`} alt={post.title} style={{ width: "100%", height: "180px", objectFit: "cover" }} />}
            <div style={{ padding: "15px" }}>
              <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "10px" }}>{post.title}</h2>
              <p style={{ fontSize: "14px", color: "#374151" }}>{post.description}</p>
              <a href={`blog/${post.slug}`} style={{ color: "#dc2626", fontWeight: "bold" }}>Read More</a>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .blog-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
        }
      `}</style>
    </div>
  );
}
