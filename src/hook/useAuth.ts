import { useState, useEffect } from "react";
import api from "@/api/conectionBack.js";
import { useRouter } from "next/navigation";

interface AuthUser {
  id: number;
  username: string;
  is_superuser: boolean;
  last_login: string;
}

interface LoginResponse {
  token: string;
  is_superuser: boolean;
  user_id: number;
  last_login: string;
}

interface LoginFormData {
  username: string;
  password: string;
}

export const useAuth = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const userId = localStorage.getItem("user_id");
      const is_superuser = localStorage.getItem("is_superuser") === "true";
      const last_login = localStorage.getItem("last_login");
      
      if (userId && last_login) {
        setUser({
          id: parseInt(userId),
          username: localStorage.getItem("username") || "",
          is_superuser,
          last_login
        });
      }
    }
  }, []);

  const updateLastLogin = async (userId: number) => {
    try {
      await api.put(`api/user/update-login/${userId}/`);
    } catch (err) {
      console.error("Error al actualizar last_login:", err);
    }
  };

  const login = async (formData: LoginFormData) => {
    setLoading(true);
    setError("");
    setSuccess(false);
    
    try {
      const response = await api.post<LoginResponse>("api/user/login/", formData);
      
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("is_superuser", String(response.data.is_superuser));
        localStorage.setItem("user_id", String(response.data.user_id));
        localStorage.setItem("last_login", response.data.last_login);
        localStorage.setItem("username", formData.username);
        
        setUser({
          id: response.data.user_id,
          username: formData.username,
          is_superuser: response.data.is_superuser,
          last_login: response.data.last_login
        });
        
        await updateLastLogin(response.data.user_id);
        
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

  const signup = async (formData: LoginFormData) => {
    setLoading(true);
    setError("");
    setSuccess(false);
    
    try {
      const response = await api.post("api/user/signup/", formData);
      
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("is_superuser", String(response.data.is_superuser));
        localStorage.setItem("user_id", String(response.data.user_id));
        localStorage.setItem("last_login", response.data.last_login);
        localStorage.setItem("username", formData.username);
        
        setUser({
          id: response.data.user_id,
          username: formData.username,
          is_superuser: response.data.is_superuser,
          last_login: response.data.last_login
        });
        
        await updateLastLogin(response.data.user_id);
        setSuccess(true);
        navigateTo('/dashboard');
      }
      
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
    } catch (err) {
      console.error("Error al cerrar sesión:", err);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user_id");
      localStorage.removeItem("is_superuser");
      localStorage.removeItem("last_login");
      localStorage.removeItem("username");
      setUser(null);
      navigateTo('/login');
    }
  };

  const navigateTo = (path: string) => {
    router.push(path);
  };
  
  const getUserDetails = async (id?: number) => {
    try {
      const userId = id || user?.id || localStorage.getItem("user_id");
      if (!userId) {
        throw new Error("ID de usuario no disponible");
      }
      
      const response = await api.get(`api/user/details/${userId}/`);
      return response.data;
    } catch (err) {
      console.error("Error al obtener detalles del usuario:", err);
      throw err;
    }
  };

  const isAuthenticated = () => {
    return !!localStorage.getItem("token");
  };

  const formatLocalDateTime = (utcDateString: string) => {
    if (!utcDateString) return "";
    const date = new Date(utcDateString);
    return date.toLocaleString('es-MX', { 
      timeZone: 'America/Mexico_City'
    });
  };

  return { 
    loading, 
    error, 
    success, 
    user,
    login, 
    signup, 
    logout, 
    navigateTo, 
    getUserDetails,
    isAuthenticated,
    formatLocalDateTime
  };
};