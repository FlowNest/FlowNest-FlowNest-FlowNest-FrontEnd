import React from 'react';
import { PaginaBienvenida } from "@/components/paginaBienvenida";
import { HeaderPaginas } from '@/components/headerPaginas';
import { Avatar } from "@nextui-org/react";
import "@/styles/perfil.scss";
import { Input } from "@nextui-org/react";
import { Icon } from '@iconify/react';


const Perfil = () => {
  return (
    <div className="contenedorPaginaChats">
      <div className="contactos">
        <HeaderPaginas titulo={"Ajustes"} />
        <div className="fotoPerfil">
          <Avatar
            className="w-21 h-21"
            src="https://i.pravatar.cc/150?u=a04258114e29026708c"
          />
        </div>
        <div className="contenedorInputPerfil">
          <p>Tu nombre</p>
          <Input className="inputPerfil" defaultValue="Juan Perez" variant="underlined" endContent={<Icon icon="fluent:edit-16-filled" width="16" height="16" />} />
        </div>
        <div className="mensajePerfil">
          Este no es tu nombre de usuario o PIN. Este nombre será visible para tus contactos de WhatsApp.
        </div>
        <div className="contenedorInputPerfil">
        <p>Info.</p>
          <Input className="inputPerfil" defaultValue="Hey there! I am using WhatsApp." variant="underlined" endContent={<Icon icon="fluent:edit-16-filled" width="16" height="16" />} />
        </div>
      </div>
      <div className="mensajes">
        <PaginaBienvenida></PaginaBienvenida>
      </div>
    </div>
  )
}

export default Perfil