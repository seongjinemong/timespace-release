import { useAuthStore } from "../store/authStore";

export const handleLogout = () => {
  localStorage.removeItem("Credential");
  useAuthStore.getState().logout();
  window.location.href = "/";
};
