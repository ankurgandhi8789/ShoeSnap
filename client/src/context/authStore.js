import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,

      login: async (email, password) => {
        const { data } = await axios.post("/api/auth/login", { email, password });
        axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
        set({ user: { name: data.name, email: data.email, role: data.role }, token: data.token });
        return data;
      },

      register: async (name, email, password) => {
        const { data } = await axios.post("/api/auth/register", { name, email, password });
        axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
        set({ user: { name: data.name, email: data.email, role: data.role }, token: data.token });
        return data;
      },

      logout: () => {
        delete axios.defaults.headers.common["Authorization"];
        set({ user: null, token: null });
      },
    }),
    {
      name: "auth-storage",
      onRehydrateStorage: () => (state) => {
        if (state?.token)
          axios.defaults.headers.common["Authorization"] = `Bearer ${state.token}`;
      },
    }
  )
);
