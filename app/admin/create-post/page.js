"use client";
import { useState } from "react";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [keywords, setKeywords] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const slug = title.toLowerCase().trim().replace(/\s+/g, "-");

    try {
      const res = await fetch("http://localhost/backend/create-post.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, content, keywords, slug })
      });
      const data = await res.json();
      alert(data.message || JSON.stringify(data));
      setTitle(""); setDescription(""); setContent(""); setKeywords("");
    } catch (err) {
      console.error(err);
      alert("Error creating post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "700px", margin: "40px auto" }}>
      <h1 style={{ textAlign: "center", color: "#dc2626" }}>Create Post</h1>
      <form onSubmit={handleSubmit} style={{ display: "grid", gap: "15px" }}>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
        <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required />
        <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Content" rows={6} />
        <input value={keywords} onChange={(e) => setKeywords(e.target.value)} placeholder="Keywords" />
        <button type="submit" disabled={loading}>{loading ? "Creating..." : "Create Post"}</button>
      </form>
    </div>
  );
}
