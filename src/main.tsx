import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <main>
      <h1>Hello, world!</h1>
      <p>Your app is up and running.</p>
    </main>
  </StrictMode>,
);
