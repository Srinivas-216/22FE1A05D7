import React from "react";
import { logger } from "../utils/logger";

const UrlList = ({ urls }) => {
  const handleRedirect = (urlObj) => {
    if (Date.now() > urlObj.expiry) {
      logger.log(`URL expired: ${urlObj.short}`, "warn");
      alert("This short URL has expired!");
    } else {
      logger.log(`Redirecting to ${urlObj.original}`, "info");
      window.open(urlObj.original, "_blank");
    }
  };

  return (
    <div className="url-list">
      <h3>Generated URLs</h3>
      <ul>
        {urls.map((urlObj, index) => (
          <li key={index}>
            <span className="short" onClick={() => handleRedirect(urlObj)}>
              {urlObj.short}
            </span>
            <span className="expiry">
              (expires at {new Date(urlObj.expiry).toLocaleTimeString()})
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UrlList;
