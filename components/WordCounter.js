"use client";
import { useState } from "react";

export default function WordCounter() {
  const [text, setText] = useState("");

  // --- LOGIC SECTION ---
  const words = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
  const characters = text.length;
  const charactersNoSpaces = text.replace(/\s+/g, "").length;
  const sentences = (text.match(/[.!?]+/g) || []).length;
  const paragraphs = text.split(/\n+/).filter((p) => p.trim() !== "").length;

  // --- READING / SPEAKING TIME ---
  const readingTimeSec = Math.round((words / 200) * 60);
  const speakingTimeSec = Math.round((words / 130) * 60);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins} min ${secs} sec`;
  };

  // --- READING LEVEL ---
  const avgWordsPerSentence = sentences > 0 ? words / sentences : 0;
  const readingLevel =
    words > 0
      ? (0.39 * avgWordsPerSentence + 11.8 * (characters / words) - 15.59).toFixed(1)
      : "N/A";

  const clearText = () => setText("");

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        maxWidth: "1100px",
        margin: "40px auto",
        padding: "20px",
        gap: "25px",
      }}
    >
      {/* LEFT SIDE - TEXT INPUT */}
      <div style={{ flex: "2 1 600px" }}>
        <h1
          style={{
            fontSize: "28px",
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: "15px",
          }}
        >
          📝 Word & Character Counter
        </h1>

        <textarea
          rows={15}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Start typing or paste your text here..."
          style={{
            width: "100%",
            padding: "14px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            fontSize: "16px",
            resize: "vertical",
            lineHeight: "1.6",
          }}
        />

        <button
          onClick={clearText}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            backgroundColor: "#dc2626",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Clear Text
        </button>
      </div>

      {/* RIGHT SIDE - RESULTS PANEL */}
      <div
        style={{
          flex: "1 1 320px",
          border: "1px solid #e5e7eb",
          borderRadius: "10px",
          padding: "20px",
          backgroundColor: "#f9fafb",
          boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
          alignSelf: "flex-start",
        }}
      >
        <h2
          style={{
            fontSize: "22px",
            fontWeight: "bold",
            marginBottom: "12px",
            textAlign: "center",
          }}
        >
          📊 Text Statistics
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "10px 15px",
            fontSize: "16px",
            lineHeight: "1.6",
          }}
        >
          <p><strong>Words:</strong> {words}</p>
          <p><strong>Characters:</strong> {characters}</p>
          <p><strong>No Spaces:</strong> {charactersNoSpaces}</p>
          <p><strong>Sentences:</strong> {sentences}</p>
          <p><strong>Paragraphs:</strong> {paragraphs}</p>
          <p><strong>Reading Level:</strong> {readingLevel}</p>
          <p><strong>Reading Time:</strong> {formatTime(readingTimeSec)}</p>
          <p><strong>Speaking Time:</strong> {formatTime(speakingTimeSec)}</p>
        </div>
      </div>
    </div>
  );
}
