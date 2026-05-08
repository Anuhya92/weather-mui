// index.tsx - Entry point for React app
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// MUI needs no separate CSS import - it works via JS-in-CSS (Emotion)

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
