import { useState } from "react";
import api from "@/api/conectionBack.js";
import { useRouter } from "next/navigation";

export const useAuth = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const login = async (formData: { username: string; password: string }) => {
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const response = await api.post("api/user/login/", formData);
      
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem('is_superuser', response.data.is_superuser);        
        if (response.data.is_superuser) {
          navigateTo('/admin-selection');
        } else {
          navigateTo('/dashboard');
        }
        return true;
      }

      throw new Error("No se recibió token en la respuesta");
      
    } catch (err: any) {
      if (err.response) {
        setError(err.response.data.error || "Credenciales inválidas");
      } else {
        setError(err.message || "Error de conexión. Intenta más tarde.");
      }
      console.error("Error de login:", err);
      return false;
    } finally {
      setLoading(false);
    }
  };


  const signup = async (formData: { username: string; password: string }) => {
    setLoading(true);
    setError("");

    try {
      const response = await api.post("api/user/signup/", formData);

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }

      setSuccess(true);
      return response.data;
    } catch (err: any) {
      if (err.response) {
        setError(err.response.data.error || "Error al registrar el usuario.");
      } else {
        setError("Error de conexión. Intenta más tarde.");
      }
      console.error("Error de registro:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  
  const logout = async () => {
    try {
      await api.post("api/user/logout/");
      localStorage.removeItem("token");
      navigateTo('/login');
    } catch (err) {
      console.error("Error al cerrar sesión:", err);
      localStorage.removeItem("token");
      navigateTo('/login');
    }
  };

  const navigateTo = (path: string) => {
    router.push(path);
  };

  return { loading, error, success, login, signup, logout, navigateTo };
};