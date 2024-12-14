"use client";  // Esta directiva indica que el archivo es un componente del lado del cliente

import React from 'react';
import { PaginaBienvenida } from "@/components/paginaBienvenida";
import { HeaderPaginas } from '@/components/headerPaginas';
import { Input } from "@nextui-org/input";
import { Icon } from '@iconify/react';
import "@/styles/ajustes.scss";
import axios from "axios";  // Importar Axios para hacer la solicitud de logout
import { useRouter } from "next/navigation";  // Usar useRouter para redirigir al login
import { Avatar } from "@nextui-org/react";

const Ajustes = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const id = localStorage.getItem("id_user");  // Asume que el id es 1
      await axios.get(`http://127.0.0.1:8000/api/users/logout/?id=${id}`);

      // Eliminar el token del localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("id_user");

      // Redirigir al login o a la página de bienvenida
      router.push("/");  // Redirige a la página de login
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <div className="contenedorPaginaChats">
      <div className="contactos">
        <HeaderPaginas titulo={"Ajustes"} />
        <div className="buscador">
          <Input placeholder="Buscar..." variant="flat" startContent={<Icon className="iconoBuscar" icon="fluent:search-32-regular" width="32" height="32" />} />
        </div>
        <div className='usuario'>
          <Avatar
            className="w-20 h-20 text-large"
            src="https://i.pravatar.cc/150?u=a04258114e29026708c"
          />
          <div className="nombreConfiguracion">
            Juan Perez
          </div>
        </div>
        <div className="opcionesConfiguracion">
          <div className="opcionConfiguracion">
            <div className="iconoConfigracion">
              <Icon icon="fluent:person-circle-28-filled" width="25" height="25" />
            </div>
            <div className="nombreConfiguracion">
              Cuenta
            </div>
          </div>
          <div className="opcionConfiguracion">
            <div className="iconoConfigracion">
              <Icon icon="fluent:lock-closed-24-filled" width="25" height="25" />
            </div>
            <div className="nombreConfiguracion">
              Privacidad
            </div>
          </div>
          <div className="opcionConfiguracion">
            <div className="iconoConfigracion">
              <Icon icon="fluent:chat-24-filled" width="25" height="25" />
            </div>
            <div className="nombreConfiguracion">
              Chats
            </div>
          </div>
          <div className="opcionConfiguracion">
            <div className="iconoConfigracion">
              <Icon icon="fluent:person-circle-28-filled" width="25" height="25" />
            </div>
            <div className="nombreConfiguracion">
              Notificaciones
            </div>
          </div>
          <div className="opcionConfiguracion">
            <div className="iconoConfigracion">
              <Icon icon="fluent:keyboard-16-filled" width="25" height="25" />
            </div>
            <div className="nombreConfiguracion">
              Atajos del teclado
            </div>
          </div>
          <div className="opcionConfiguracion">
            <div className="iconoConfigracion">
              <Icon icon="fluent:question-circle-12-filled" width="25" height="25" />
            </div>
            <div className="nombreConfiguracion">
              Ayuda
            </div>
          </div>
          <div className="opcionConfiguracion cerrarSesion" onClick={handleLogout}>
            <div className="iconoConfigracion">
              <Icon icon="fluent:arrow-exit-20-regular" width="25" height="25" />
            </div>
            <div className="nombreConfiguracion">
              Salir
            </div>
          </div>
        </div>
      </div>
      <div className="mensajes">
        <PaginaBienvenida></PaginaBienvenida>
      </div>
    </div>
  );
};

export default Ajustes;
