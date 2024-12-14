// estados.js
import React from 'react';
import { PaginaBienvenida } from "@/components/paginaBienvenida";
import { HeaderPaginas } from '@/components/headerPaginas';
import { Badge, Avatar } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import "@/styles/estados.scss";
import { EstadoContacto } from '@/components/estadoContacto';

const estadosData = [
  {
    nombre: "Juan Mecánico",
    avatar: "https://i.pravatar.cc/300?u=a042581f4e290267001",
    dia: "Hoy",
    hora: "10:30 AM",
  },
  {
    nombre: "María López",
    avatar: "https://i.pravatar.cc/300?u=a042581f4e290267002",
    dia: "Ayer",
    hora: "4:15 PM",
  },
  {
    nombre: "Carlos García",
    avatar: "https://i.pravatar.cc/300?u=a042581f4e290267003",
    dia: "Hoy",
    hora: "8:00 AM",
  },
];

const Estados = () => {
  return (
    <div className="contenedorPaginaChats">
      <div className="contactos">
        <HeaderPaginas titulo={"Estados"} />
        <div className="agregarEstado">
          <div>
            <Badge
              isOneChar
              color="success"
              content={<Icon icon="fluent:add-28-regular" width="28" height="28" />}
              placement="bottom-right"
              shape="circle"
            >
              <Avatar radius="full" size="lg" src="https://i.pravatar.cc/300?u=a042581f4e29026704f" />
            </Badge>
          </div>
          <div>
            <p className="estadoTitulo">Mi estado</p>
            <p className="descripcionAgregarEstado">Haz clic para añadir una actualización de estado</p>
          </div>
        </div>
        <div className="espacio"></div>
        <div className="listaEstados">
          <p className="tituloVerde">RECIENTE</p>
          {estadosData.map((estado, index) => (
            <EstadoContacto
              key={index}
              nombre={estado.nombre}
              avatar={estado.avatar}
              dia={estado.dia}
              hora={estado.hora}
            />
          ))}
        </div>
      </div>
      <div className="mensajes">
        <PaginaBienvenida></PaginaBienvenida>
      </div>
    </div>
  );
};

export default Estados;
