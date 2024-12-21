// src/loader/tokenLoader.js
export function tokenLoader() {
  const token = localStorage.getItem("Credential");

  if (!token) {
    throw new Error("Not authenticated!");
  }

  return token;
}
