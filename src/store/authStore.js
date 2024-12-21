// src/store/authStore.js 수정
import { create } from "zustand";
import { jwtDecode } from "jwt-decode";

export const useAuthStore = create((set) => ({
  user: null,
  userName: "",
  userId: null,
  isLoggedIn: !!localStorage.getItem("Credential"),
  setCredentials: (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    set({
      user: credentialResponse,
      userName: decoded.name,
      isLoggedIn: true,
    });
  },
  setUserId: (id) => set({ userId: id }),
  logout: () =>
    set({
      user: null,
      userName: "",
      userId: null,
      isLoggedIn: false,
    }),
}));
