import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import store from "./lib/store.ts";
import { HelmetProvider } from "react-helmet-async";

const helmetContext = {};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <HelmetProvider context={helmetContext}>
        <App />
      </HelmetProvider>
    </Provider>
  </StrictMode>
);
