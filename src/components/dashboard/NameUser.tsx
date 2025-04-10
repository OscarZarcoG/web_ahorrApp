'use client'
import api from "@/api/conectionBack.js";
import { useState, useEffect } from 'react'
import { Mini_alert } from '@/components/alerts/Mini-alert'

export const NameUser = () => {
    const [userName, setUserName] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)


    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userId = localStorage.getItem('user_id');
                const response = await api.get(`api/user/details/${userId}/`);
                setUserName(response.data.first_name || 'Usuario');
            } catch (error) {
                console.error('Error:', error);
                setError('No se pudo cargar el nombre de usuario');
                setUserName('Usuario');
            } finally {
                setLoading(false);
            }

            setTimeout(() => {
                setError(null);
            }, 2000);
        };

        fetchUserData();
    }, []);

    return (
        <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                {loading ? 'Cargando...' : `Bienvenido ${userName}`}
            </h1>
            {error && (
                <Mini_alert type="error" message={error} />
            )}
        </div>
    )
}