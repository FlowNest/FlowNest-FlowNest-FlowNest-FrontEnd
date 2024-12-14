import React from 'react';
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import "@/styles/canales.scss";
import { Icon } from "@iconify/react";

// Definición de los tipos de las props del componente
interface RegistroCanalesProps {
  avatar: string; // Tipo para la URL de la imagen del avatar
  nombre: string;  // Tipo para el nombre del canal
  seguidores: string; // Tipo para el número de seguidores
}

export const RegistroCanales: React.FC<RegistroCanalesProps> = ({ avatar, nombre, seguidores }) => {
  return (
    <div className="contenedorCanales">
      <div className="contenedorNombreCanal">
        <Avatar size="lg" src={avatar} />
        <div className="nombreCanal">
          <div className="nombreConIcono">
            <p className="nombre">{nombre}
            </p>
            <Icon className="iconoVerificado" icon="fluent:shield-task-28-regular" width="20" height="20" />
          </div>
          <p className="numSeguidores">{seguidores}</p>
        </div>
      </div>
      <div className="contenedorSeguirCanal">
        <Button color="primary" variant="bordered">
          Seguir
        </Button>
      </div>
    </div>
  );
};
