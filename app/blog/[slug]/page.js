// app/blog/[slug]/page.js
import { db } from "@/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import Head from "next/head";


// Generate static params for all posts
export async function generateStaticParams() {
  const snapshot = await getDocs(collection(db, "posts"));
  return snapshot.docs
    .map((doc) => doc.data().slug)
    .filter(Boolean)
    .map((slug) => ({ slug }));
}

// Component to display single post
export default async function PostPage({ params }) {
  const { slug } = params || {};

  if (!slug) return <p>Slug not found</p>;

  // Query Firestore for this slug
  const q = query(collection(db, "posts"), where("slug", "==", slug));
  const snapshot = await getDocs(q);

  if (snapshot.empty) return <p>Post not found</p>;

  const post = snapshot.docs[0].data();

  return (
    <div style={{ maxWidth: "900px", margin: "40px auto", padding: "20px" }}>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.description} />
        <meta name="keywords" content={post.keywords} />
        <meta property="og:image" content={post.image_url || "/placeholder.png"} />
      </Head>

      <h1 style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "20px" }}>
        {post.title}
      </h1>

      <img
        src={post.image_url || "/placeholder.png"}
        alt={post.title}
        style={{
          width: "100%",
          maxHeight: "500px",
          objectFit: "cover",
          borderRadius: "10px",
          marginBottom: "20px",
        }}
      />

      <div
        dangerouslySetInnerHTML={{ __html: post.content }}
        style={{ fontSize: "18px", lineHeight: "1.8", color: "#374151" }}
      ></div>
    </div>
  );
}
