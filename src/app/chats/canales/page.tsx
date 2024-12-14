// canales.js
import React from 'react';
import { PaginaBienvenida } from "@/components/paginaBienvenida";
import { HeaderPaginas } from '@/components/headerPaginas';
import { Button } from "@nextui-org/button";
import { RegistroCanales } from '@/components/Registrocanales';
import "@/styles/canales.scss";

const canalesData = [
  {
    avatar: "https://upload.wikimedia.org/wikipedia/commons/9/91/PlayStation_App_Icon.jpg",
    nombre: "PlayStation",
    seguidores: "3.5 M de seguidores",
  },
  {
    avatar: "https://store-images.s-microsoft.com/image/apps.8453.13655054093851568.4a371b72-2ce8-4bdb-9d83-be49894d3fa0.7f3687b9-847d-4f86-bb5c-c73259e2b38e",
    nombre: "WhatsApp",
    seguidores: "198.3 M de seguidores",
  },
  {
    avatar: "https://summa.es/wp-content/uploads/2022/07/barc%CC%A7a-thumbnail-1.png",
    nombre: "FC Barcelona",
    seguidores: "42.2 M de seguidores",
  },
];

const Canales = () => {
  return (
    <div className="contenedorPaginaChats">
      <div className="contactos">
        <HeaderPaginas titulo={"Canales"} />
        <div className="contenedorListaCanales">
          <div className="subtituloCanales">
            <p>Conoce las novedades de tus temas favoritos</p>
          </div>
          <div className="descripcionCanales">
            <p>A continuación, busca canales para seguir</p>
          </div>
          <div className="contenedorPrincipalCanales">
            {canalesData.map((canal, index) => (
              <RegistroCanales
                key={index}
                avatar={canal.avatar}
                nombre={canal.nombre}
                seguidores={canal.seguidores}
              />
            ))}
          </div>
          <div className="botonCanales">
            <Button color="primary">Descubrir más</Button>
          </div>
        </div>
      </div>
      <div className="mensajes">
        <PaginaBienvenida></PaginaBienvenida>
      </div>
    </div>
  );
};

export default Canales;
