"use client";

import React, { useState } from "react";
import "@/styles/header.scss";

// Obtener la fecha y hora de Ecuador (Latinoamérica) en formato "YYYY-MM-DD HH:MM:SS"
const obtenerFechaEcuador = (): string => {
    const fecha = new Date();
    const opciones: Intl.DateTimeFormatOptions = {
        timeZone: "America/Guayaquil",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
    };

    const fechaEcuador = new Intl.DateTimeFormat("sv-SE", opciones)
        .format(fecha)
        .replace("T", " ");
    return fechaEcuador;
};

export default function Encabezado() {
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const form = e.currentTarget; // Formulario actual
        const formData = new FormData(form);
        const phone_number = formData.get("phone_number") as string;
        const username = formData.get("username") as string;
        const password_hash = formData.get("password_hash") as string;

        // Campos adicionales
        const newUser = {
            phone_number,
            username,
            password_hash,
            status: "activo",
            profile_picture: "",
            last_seen: obtenerFechaEcuador(),
            is_online: "1",
            created_at: obtenerFechaEcuador(),
            updated_at: obtenerFechaEcuador(),
        };

        try {
            const response = await fetch("http://127.0.0.1:8000/api/users/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newUser),
            });

            if (!response.ok) {
                throw new Error("Error al registrar usuario");
            }


            form.reset(); // Verifica que el formulario existe antes de llamarlo
            setShowModal(false);
        } catch (error) {
            console.error("Error al registrar el usuario:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <header className="contenedorEncabezado">
                <div className="encabezado">
                    <img src="/logo_1.svg" alt="Logo" />
                    <div className="botonesEncabezado">
                        <button className="botonWsp">Descargar</button>
                        <button className="botonRegistrar" onClick={handleOpenModal}>
                            Registro
                        </button>
                    </div>
                </div>
            </header>

            {/* Modal */}
            {showModal && (
                <div className="modalOverlay">
                    <div className="modal">
                        <button className="closeButton" onClick={handleCloseModal}>
                            &times;
                        </button>
                        <h2>Registrar Usuario</h2>
                        <form className="registroForm" onSubmit={handleFormSubmit}>
                            <label>
                                Teléfono
                                <input type="text" name="phone_number" required />
                            </label>
                            <label>
                                Nombre
                                <input type="text" name="username" required />
                            </label>
                            <label>
                                Contraseña
                                <input type="password" name="password_hash" required />
                            </label>
                            <button type="submit" className="submitButton" disabled={loading}>
                                {loading ? "Registrando..." : "Registrar"}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
