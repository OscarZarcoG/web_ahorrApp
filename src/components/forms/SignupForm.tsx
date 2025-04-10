'use client'
import React, { useState } from "react";
import { FormInput } from "./FormInput";
import { Alert } from "../alerts/Alert";
import { SubmitButton } from "@/components/forms/SubmitButton";
import { useAuth } from "@/hook/useAuth";

export const SignupForm = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });

    const [showPassword, setShowPassword] = useState(false);
    const [emptyFields, setEmptyFields] = useState(false);
    const { loading, error, success, signup, navigateTo } = useAuth();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        if (emptyFields) {
            setEmptyFields(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.username.trim() || !formData.password.trim()) {
            setEmptyFields(true);
            return;
        }

        try {
            await signup(formData);
            navigateTo('/dashboard');
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
            
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const goToLogin = () => {
        navigateTo('/login');
    };

    if (success) {
        return <Alert type="success" message="Registro exitoso. Redirigiendo..." />;
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && <Alert type="error" message={error} />}
            {emptyFields && <Alert type="error" message="Por favor, completa todos los campos." />}

            <FormInput
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Tu nombre de usuario"
                label="Usuario"
                error={emptyFields && !formData.username.trim()}
            />

            <FormInput
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Tu contraseña"
                label="Contraseña"
                error={emptyFields && !formData.password.trim()}
                showPasswordToggle={true}
                showPassword={showPassword}
                onTogglePassword={togglePasswordVisibility}
            />

            <div className="pt-2 text-center">
                <SubmitButton
                    loading={loading}
                    label="Registrarse"
                    loadingLabel="Registrando..."
                />
            </div>

            <div className="pt-2 text-gray-950 text-center dark:text-gray-50">
                ¿Ya tienes una cuenta? <button
                    type="button"
                    onClick={goToLogin}
                    className="text-blue-600 hover:underline dark:text-blue-500"
                >
                    Inicia Sesión
                </button>
            </div>
        </form>
    );
};