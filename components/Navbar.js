"use client";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 25px",
        backgroundColor: "#dc2626", // red
        color: "white",
        flexWrap: "wrap",
      }}
    >
      {/* Logo left */}
      <Link href="/">
        <span
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            cursor: "pointer",
            color: "white",
          }}
        >
          WordCounter 📝
        </span>
      </Link>

      {/* Hamburger for mobile */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        style={{
          display: "none",
          background: "transparent",
          border: "none",
          color: "white",
          fontSize: "28px",
          cursor: "pointer",
        }}
        className="mobile-toggle"
      >
        ☰
      </button>

      {/* Menu links */}
      <div
        style={{
          display: "flex",
          gap: "30px",
          justifyContent: "center",
          flex: "1",
          transition: "all 0.3s ease",
          flexDirection: "row",
        }}
        className={menuOpen ? "menu-open" : ""}
      >
        {["Home", "Blog", "More Tools"].map((item) => (
          <Link
            key={item}
            href={item === "Home" ? "/" : `/${item.toLowerCase().replace(" ", "-")}`}
            style={{
              textDecoration: "none",
              color: "white",
              fontWeight: "500",
              position: "relative",
            }}
          >
            <span
              style={{
                transition: "all 0.3s ease",
              }}
              className="menu-item"
            >
              {item}
            </span>
          </Link>
        ))}
      </div>

      <style jsx>{`
        nav .menu-item:hover {
          transform: translateY(-3px);
          text-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }
        @media (max-width: 768px) {
          .mobile-toggle {
            display: block;
          }
          div[class*="menu-open"] {
            display: flex;
            flex-direction: column;
            width: 100%;
            gap: 15px;
            margin-top: 10px;
          }
        }
      `}</style>
    </nav>
  );
}
