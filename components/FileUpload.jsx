"use client";

import { useState } from "react";


export default function FileUpload() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (!file) {
      setError("Please select a JPG ,PNG or PDF handwritten notes image.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/process-notes", {
        method: "POST",
        body: formData
      });

      if (!response.ok) {
        let message = "Something went wrong.";
        try {
          const data = await response.json();
          message = data.error || message;
        } catch {}
        throw new Error(message);
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "formatted-notes.pdf";
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to process notes.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="upload-container">
      <h1>Handwritten Notes to PDF</h1>
      <p>Upload handwritten notes and convert them into a clean, formatted PDF using GenAI.</p>

      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/png,image/jpeg,application/pdf"
          onChange={(e) => {
            setFile(e.target.files?.[0] || null);
            setError("");
          }}
        />

        {file && <p>Selected: <strong>{file.name}</strong></p>}

        <button   type="submit" disabled={loading}>
          {loading ? "Processing..." : "Convert to PDF"}
        </button>

        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}
