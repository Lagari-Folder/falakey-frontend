import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import store from "./lib/store.ts";
import { HelmetProvider } from "react-helmet-async";
import { createTheme, Direction, ThemeProvider } from "@mui/material";
import Cookies from "js-cookie";

const helmetContext = {};

const dir = Cookies.get("dir") || "rtl";

const rtlTheme = createTheme({
  direction: dir as Direction,
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={rtlTheme}>
      <Provider store={store}>
        <HelmetProvider context={helmetContext}>
          <App />
        </HelmetProvider>
      </Provider>
    </ThemeProvider>
  </StrictMode>
);
