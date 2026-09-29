import { defineConfig, loadEnv } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  // import.meta.env is inlined at build time, so a production bundle that picks
  // up the localhost value from .env gets deployed as-is and every API call runs
  // against the visitor's own machine instead of the API host. Refuse to emit
  // that bundle rather than shipping a login form that can never succeed.
  if (mode === "production") {
    const base = (loadEnv(mode, process.cwd(), "VITE_").VITE_URL_BASE || "").trim();

    if (!base.startsWith("https://")) {
      throw new Error(
        `VITE_URL_BASE must be an https:// URL for a production build, got "${base}". ` +
          `Set it in .env.production or as a VITE_URL_BASE variable in the build environment.`
      );
    }
  }

  return {
    plugins: [tailwindcss(), react()],
    server: {
      port: 5173,
    },
  };
});
