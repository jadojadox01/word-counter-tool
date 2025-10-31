"use client";

import { useState } from "react";
import { db, storage } from "@/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [keywords, setKeywords] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    setSlug(generateSlug(e.target.value));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImage(null);
      setImagePreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description) return alert("Title & description are required!");
    setLoading(true);

    try {
      let imageUrl = "";
      if (image) {
        const uniqueName = `${Date.now()}-${image.name}`;
        const imageRef = ref(storage, `blog-images/${uniqueName}`);
        const snapshot = await uploadBytes(imageRef, image);
        imageUrl = await getDownloadURL(snapshot.ref);
      }

      await addDoc(collection(db, "posts"), {
        title,
        slug,
        description,
        keywords,
        content,
        image_url: imageUrl,
        created_at: serverTimestamp(),
        updated_at: serverTimestamp(),
      });

      alert("✅ Post created successfully!");
      setTitle("");
      setSlug("");
      setDescription("");
      setKeywords("");
      setContent("");
      setImage(null);
      setImagePreview(null);
    } catch (error) {
      console.error("Error creating post:", error);
      alert("❌ Error creating post. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "700px", margin: "40px auto", padding: "20px" }}>
      <h1
        style={{
          fontSize: "28px",
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: "25px",
          color: "#dc2626",
        }}
      >
        Create Blog Post
      </h1>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: "15px" }}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={handleTitleChange}
          required
          style={{
            padding: "12px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            fontSize: "16px",
          }}
        />
        <input
          type="text"
          placeholder="Slug (auto-generated)"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          style={{
            padding: "12px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            fontSize: "16px",
            backgroundColor: "#f3f3f3",
          }}
          readOnly
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          style={{
            padding: "12px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            fontSize: "16px",
          }}
        />
        <input
          type="text"
          placeholder="Keywords (comma separated)"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          style={{
            padding: "12px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            fontSize: "16px",
          }}
        />
        <textarea
          placeholder="Content (HTML or Markdown)"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={10}
          style={{
            padding: "12px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            fontSize: "16px",
            lineHeight: "1.6",
          }}
        />
        <input type="file" onChange={handleImageChange} accept="image/*" />
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Preview"
            style={{
              width: "100%",
              maxHeight: "300px",
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />
        )}
        <button
          type="submit"
          disabled={loading}
          style={{
            backgroundColor: "#dc2626",
            color: "white",
            padding: "12px",
            fontSize: "16px",
            fontWeight: "bold",
            border: "none",
            borderRadius: "6px",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Creating..." : "Create Post"}
        </button>
      </form>
    </div>
  );
}
