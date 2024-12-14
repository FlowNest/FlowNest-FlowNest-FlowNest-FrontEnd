import React from 'react';
import { PaginaBienvenida } from "@/components/paginaBienvenida";
import { HeaderPaginas } from '@/components/headerPaginas';
import { Button, ButtonGroup } from "@nextui-org/button";
import "@/styles/comunidad.scss";
import { Icon } from '@iconify/react';

const Comunidades = () => {
  return (
    <div className="contenedorPaginaChats">
      <div className="contactos">
        <HeaderPaginas titulo={"Comunidades"} />
        <div className="contenedorComunidad">

          <img src="/comunidad.png" alt="" />
          <p className="subtituloComunidad">
            Crea una comunidad para mantenerte en contacto
          </p>
          <p className="descripcionComunidad">
            Las comunidades reúnen a los miembros en grupos por temas y facilitan la recepción de avisos de los administradores. Cualquier comunidad a la que te añadan aparecerá aquí.
          </p>
          <p className='enlace'>
            Ver ejemplos de comunidades
            <Icon icon="fluent:ios-arrow-rtl-24-filled" width="18" height="18" />
          </p>
          <Button className='botonVerde' color="primary">Iniciar tu comunidad</Button>
        </div>
      </div>
      <div className="mensajes">
        <PaginaBienvenida></PaginaBienvenida>
      </div>
    </div>
  )
}

export default Comunidades