const API_BASE = (import.meta.env.VITE_API_BASE_URL || "https://laranat21-project.onrender.com").replace(/\/$/, "");
const AUTH_TOKEN_KEY = "lanart_auth_token";

export type AuthUser = {
  id: number;
  name: string;
  email: string;
};

export function getAuthToken(): string | null {
  return localStorage.getItem(AUTH_TOKEN_KEY);
}

export function setAuthToken(token: string): void {
  localStorage.setItem(AUTH_TOKEN_KEY, token);
}

export function clearAuthToken(): void {
  localStorage.removeItem(AUTH_TOKEN_KEY);
}

export async function authFetch(path: string, init: RequestInit = {}): Promise<Response> {
  const token = getAuthToken();
  const headers = new Headers(init.headers || {});
  if (token) headers.set("Authorization", `Bearer ${token}`);
  if (!headers.has("Content-Type") && init.body) headers.set("Content-Type", "application/json");
  return fetch(`${API_BASE}${path}`, { ...init, headers });
}

export async function loginWithApi(email: string, password: string): Promise<AuthUser> {
  const res = await authFetch("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.detail || "Login failed");
  setAuthToken(data.token);
  return data.user as AuthUser;
}

export async function fetchMe(): Promise<AuthUser> {
  const res = await authFetch("/api/auth/me");
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data?.detail || "Unauthorized");
  return data as AuthUser;
}

export async function logoutApi(): Promise<void> {
  try {
    await authFetch("/api/auth/logout", { method: "POST" });
  } finally {
    clearAuthToken();
  }
}


