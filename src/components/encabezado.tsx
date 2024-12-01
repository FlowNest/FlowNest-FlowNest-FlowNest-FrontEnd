"use client";

import React from 'react'
import "@/styles/header.scss"

export default function Encabezado() {
    return (
        <header className='contenedorEncabezado'>
            <div className='encabezado'>
                <img src="/logo_1.svg" alt="" />
                <button className="botonWsp">Descargar</button>
            </div>
        </header>
    )
}