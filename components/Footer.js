"use client";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      style={{
        marginTop: "50px",
        padding: "20px 25px",
        backgroundColor: "#1f2937",
        color: "white",
        textAlign: "center",
      }}
    >
      <p>
        © {year} WordCounter Tool — Built with ❤️ by KAKA
      </p>
      <p style={{ fontSize: "14px", marginTop: "5px" }}>
        Free online tool for writers, students, and bloggers.
      </p>
    </footer>
  );
}
