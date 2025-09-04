import React from "react";
import { logger } from "../utils/logger";

const Logger = () => {
  const logs = logger.getLogs();
  return (
    <div className="logger">
      <h3>Application Logs</h3>
      <ul>
        {logs.map((log, index) => (
          <li key={index} className={log.type}>
            <strong>[{log.time}]</strong> {log.message}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Logger;
