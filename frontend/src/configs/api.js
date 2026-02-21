import axios from 'axios';

const normalizeUrl = (value) => {
  if (!value) return "";
  return value
    .trim()
    .replace(/^['"]|['"]$/g, "")
    .replace(/\/+$/, "");
};

const envBaseURL = normalizeUrl(
  import.meta.env.VITE_BASE_URL || import.meta.env.VITE_API_URL
);

const baseURL = envBaseURL || (import.meta.env.DEV ? "http://localhost:3000" : "");

const api = axios.create({
  baseURL: baseURL || undefined,
})

if (!envBaseURL && !import.meta.env.DEV) {
  console.error("Missing VITE_BASE_URL or VITE_API_URL in frontend environment.");
}

export default api;
