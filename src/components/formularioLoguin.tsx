"use client";

import React from 'react'
import "@/styles/header.scss"
import { Input } from "@nextui-org/react";
import { LuMail } from "react-icons/lu";
import { LuEye } from "react-icons/lu";
import { LuEyeOff } from "react-icons/lu";
import { Button } from "@nextui-org/react";

export default function formularioLoguin() {
    const [isVisible, setIsVisible] = React.useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);


    return (
        <div className='contenedorFormularioLoguin'>
            <form action="" className='formularioLoguin'>
                <Input
                    type="email"
                    label="Correo"
                    variant='bordered'
                    endContent={
                        <LuMail className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                />
                <Input
                    label="Contraseña"
                    variant="bordered"
                    endContent={
                        <button className="focus:outline-none" type="button" onClick={toggleVisibility} aria-label="toggle password visibility">
                            {isVisible ? (
                                <LuEyeOff className="text-2xl text-default-400 pointer-events-none" />
                            ) : (
                                <LuEye className="text-2xl text-default-400 pointer-events-none" />
                            )}
                        </button>
                    }
                    type={isVisible ? "text" : "password"}
                    
                />
                <button className="botonWsp">Ingresar</button>
            </form>
        </div>
    )
}