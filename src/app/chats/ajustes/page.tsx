import React from 'react';
import { PaginaBienvenida } from "@/components/paginaBienvenida";
import { HeaderPaginas } from '@/components/headerPaginas';
import { Input } from "@nextui-org/input";
import { Icon } from '@iconify/react';
import "@/styles/ajustes.scss";

const Ajustes = () => {
  return (
    <div className="contenedorPaginaChats">
      <div className="contactos">
        <HeaderPaginas titulo={"Ajustes"} />
        <div className="buscador">
          <Input placeholder="Buscar..." variant="flat" startContent={<Icon className="iconoBuscar" icon="fluent:search-32-regular" width="32" height="32" />} />
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
            <Icon icon="fluent:person-circle-28-filled" width="25" height="25" />
            </div>
            <div className="nombreConfiguracion">
              Cuenta
            </div>
          </div>
          <div className="opcionConfiguracion cerrarSesion">
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
  )
}

export default Ajustes