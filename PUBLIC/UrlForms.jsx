import React, { useState } from "react";
import { logger } from "../utils/logger";

const UrlForm = ({ onAddUrl }) => {
  const [url, setUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url) {
      logger.log("Empty URL entered", "error");
      return;
    }

    try {
      // Call backend API to generate short URL
      const response = await fetch("http://localhost:5000/api/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ longUrl: url, expiryMinutes: 30 }),
      });
      const data = await response.json();

      if (data.shortUrl) {
        onAddUrl({
          original: url,
          short: data.shortUrl,
          expiry: Date.now() + 30 * 60 * 1000, // 30 mins
        });
        logger.log(`Short URL generated: ${data.shortUrl}`, "info");
        setUrl("");
      } else {
        logger.log("Error generating short URL", "error");
      }
    } catch (err) {
      logger.log("API request failed", "error");
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="url-form">
      <input
        type="text"
        placeholder="Enter your long URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button type="submit">Shorten</button>
    </form>
  );
};

export default UrlForm;
