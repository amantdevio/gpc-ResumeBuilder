import axios from 'axios';

const normalizeUrl = (value) => {
  if (!value) return "";
  let cleaned = value
    .trim()
    .replace(/^['"]|['"]$/g, "")
    .replace(/\/+$/, "");
  // Avoid double "/api/api/..." when users put "/api" in env value
  cleaned = cleaned.replace(/\/api$/i, "");
  return cleaned;
};

const envBaseURL = normalizeUrl(
  import.meta.env.VITE_BASE_URL || import.meta.env.VITE_API_URL
);

const guessRenderBackendUrl = () => {
  if (typeof window === "undefined") return "";
  const host = window.location.hostname;
  // e.g. gpc-resumebuilder-1.onrender.com -> gpc-resumebuilder.onrender.com
  const guessedHost = host.replace(/-\d+(?=\.onrender\.com$)/, "");
  if (guessedHost !== host) {
    return `https://${guessedHost}`;
  }
  return "";
};

const baseURL =
  envBaseURL ||
  (import.meta.env.DEV ? "http://localhost:3000" : guessRenderBackendUrl());

const api = axios.create({
  baseURL: baseURL || undefined,
})

if (!envBaseURL && !import.meta.env.DEV) {
  console.warn("VITE_BASE_URL not set. Using guessed Render backend URL:", baseURL);
}

export default api;
