"use client";

import React, { useState } from "react";
import "@/styles/header.scss";
import { Input } from "@nextui-org/react";
import { LuMail, LuEye, LuEyeOff } from "react-icons/lu";
import { useRouter } from "next/navigation";
import axios from "axios";  // No es necesario importar AxiosError

export default function FormularioLoguin() {
    const [isVisible, setIsVisible] = useState(false);
    const [phone, setPhone] = useState("");  // Para guardar el teléfono
    const [password, setPassword] = useState("");  // Para guardar la contraseña
    const [errorMessage, setErrorMessage] = useState("");  // Para manejar errores de login
    const router = useRouter();

    const toggleVisibility = () => setIsVisible(!isVisible);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            // Realiza la solicitud HTTP GET a la API, pasando los parámetros en la URL
            const response = await axios.get("http://127.0.0.1:8000/api/users/login/", {
                params: {
                    phone,
                    password
                }
            });

            // Si el login es exitoso, guarda el token o lo que sea necesario
            localStorage.setItem("token", response.data.token);  // Asumiendo que la API devuelve un 'token'
            localStorage.setItem("id_user", response.data.id);
            router.push("/chats");  // Redirige al chat
        } catch (error: unknown) {  // Usa 'unknown' en lugar de 'AxiosError'
            if (axios.isAxiosError(error)) {
                // Si es un error de Axios, maneja el error adecuadamente
                setErrorMessage("Credenciales incorrectas o error en la API.");
                console.error("Error al hacer login:", error.response?.data);  // Accede al cuerpo de la respuesta del error
            } else {
                setErrorMessage("Error desconocido.");
                console.error("Error desconocido:", error);
            }
        }
    };

    return (
        <div className="contenedorFormularioLoguin">
            <form action="" className="formularioLoguin" onSubmit={handleLogin}>
                <Input
                    type="text"
                    label="Teléfono"
                    variant="bordered"
                    value={phone}  // Vincula el valor del input con el estado 'phone'
                    onChange={(e) => setPhone(e.target.value)}  // Actualiza el estado 'phone'
                    endContent={
                        <LuMail className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                />
                <Input
                    type={isVisible ? "text" : "password"}
                    label="Contraseña"
                    variant="bordered"
                    value={password}  // Vincula el valor del input con el estado 'password'
                    onChange={(e) => setPassword(e.target.value)}  // Actualiza el estado 'password'
                    endContent={
                        <button
                            className="focus:outline-none"
                            type="button"
                            onClick={toggleVisibility}
                            aria-label="toggle password visibility"
                        >
                            {isVisible ? (
                                <LuEyeOff className="text-2xl text-default-400 pointer-events-none" />
                            ) : (
                                <LuEye className="text-2xl text-default-400 pointer-events-none" />
                            )}
                        </button>
                    }
                />
                {errorMessage && <div className="error-message">{errorMessage}</div>} {/* Muestra un mensaje de error si es necesario */}
                <button type="submit" className="botonWsp">
                    Ingresar
                </button>
            </form>
        </div>
    );
}
