"use client";

import React from 'react';
import SideNav from '@/components/sidenav';
import ContenedorPagina from '@/components/contenedor-pagina';

export default function ChatsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="contenedorPrincipalChats">
            <SideNav />
            <main className="contenedorPrincipalPaginas">
                <ContenedorPagina>{children}</ContenedorPagina>
            </main>
        </div>
    );
}
