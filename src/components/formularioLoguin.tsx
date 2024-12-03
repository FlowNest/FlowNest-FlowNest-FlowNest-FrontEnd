"use client";

import React from "react";
import "@/styles/header.scss";
import { Input } from "@nextui-org/react";
import { LuMail, LuEye, LuEyeOff } from "react-icons/lu";
import { useRouter } from "next/navigation";

export default function FormularioLoguin() {
    const [isVisible, setIsVisible] = React.useState(false);
    const router = useRouter(); 

    const toggleVisibility = () => setIsVisible(!isVisible);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault(); 
        router.push("/chats"); 
    };

    return (
        <div className="contenedorFormularioLoguin">
            <form action="" className="formularioLoguin" onSubmit={handleLogin}>
                <Input
                    type="email"
                    label="Correo"
                    variant="bordered"
                    endContent={
                        <LuMail className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                />
                <Input
                    label="Contraseña"
                    variant="bordered"
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
                    type={isVisible ? "text" : "password"}
                />
                <button type="submit" className="botonWsp">
                    Ingresar
                </button>
            </form>
        </div>
    );
}
