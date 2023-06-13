export function refreshSession() {
  return fetch("/api/auth/session");
}
