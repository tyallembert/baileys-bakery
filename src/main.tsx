import { ConvexAuthProvider } from "@convex-dev/auth/react";
import { ConvexReactClient } from "convex/react";
import { HelmetProvider } from "@dr.pogodin/react-helmet";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HelmetProvider>
      <ConvexAuthProvider client={convex}>
        <App />
      </ConvexAuthProvider>
    </HelmetProvider>
  </React.StrictMode>
);
