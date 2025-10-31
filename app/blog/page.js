"use client";

import { db } from "@/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function BlogPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const postsRef = collection(db, "posts");
      const q = query(postsRef, orderBy("created_at", "desc"));
      const snapshot = await getDocs(q);
      const fetchedPosts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(fetchedPosts);
    };
    fetchPosts();
  }, []);

  return (
    <>
    <Navbar />
    <div style={{ maxWidth: "1200px", margin: "40px auto", padding: "20px" }}>
      <h1 style={{
        fontSize: "36px",
        fontWeight: "bold",
        marginBottom: "40px",
        textAlign: "center",
        color: "#dc2626"
      }}>
        Blog
      </h1>

      {posts.length === 0 && <p style={{ textAlign: "center" }}>No posts yet.</p>}

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "25px",
      }}>
        {posts.map((post) => (
          <div key={post.id} style={{
            border: "1px solid #e5e7eb",
            borderRadius: "12px",
            backgroundColor: "#f9fafb",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            transition: "transform 0.3s, box-shadow 0.3s",
          }} className="blog-card">
            <img
              src={post.image_url || "/placeholder.png"}
              alt={post.title}
              style={{ width: "100%", height: "180px", objectFit: "cover" }}
            />
            <div style={{ padding: "15px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <h2 style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  marginBottom: "8px",
                  color: "#1f2937",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}>{post.title}</h2>
                <p style={{
                  fontSize: "14px",
                  lineHeight: "1.5",
                  color: "#374151",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                  marginBottom: "12px"
                }}>
                  {post.description}
                </p>
              </div>
              <Link href={`/blog/${post.slug}`}>
                <button style={{
                  backgroundColor: "#dc2626",
                  color: "white",
                  padding: "10px",
                  border: "none",
                  borderRadius: "6px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  transition: "background 0.3s"
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#b91c1c"}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#dc2626"}
                >
                  Read More
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .blog-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.15);
        }
      `}</style>
    </div>
    <br />

    <Footer />
      </>
  );

}
