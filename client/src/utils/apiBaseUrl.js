const PROTOCOL_REGEX = /^[a-zA-Z][a-zA-Z\d+\-.]*:\/\//;

export function getApiBaseUrl() {
  const rawUrl = (import.meta.env.VITE_API_BASE_URL || "").trim();

  if (!rawUrl) {
    return "";
  }

  if (PROTOCOL_REGEX.test(rawUrl)) {
    return rawUrl;
  }

  return `http://${rawUrl}`;
}
