import React from 'react';
import { Button, ButtonGroup } from "@nextui-org/button";
import "@/styles/components/paginaBienvenida.scss";
import { Icon } from '@iconify/react';

export const PaginaBienvenida = () => {
    return (
        <div className="paginaBienvenida">
            <img className='imagenBienvenida' src="/imagenBienvenida.png" alt="" />
            <p className="descargaWsp">
                Descarga WhatsApp para Windows
            </p>
            <p className="descripcion">
                Descarga la aplicación para Windows y haz llamadas, comparte pantalla y disfruta de una experiencia más rápida.
            </p>
            <Button color="primary">Descargar de Microsoft Store</Button>
            <p className="mensajeEncriptacion">
            <Icon icon="fluent:lock-closed-24-regular" width="20" height="20" />
                Tus mensajes están cifrados de extremo a extremo.
            </p>
        </div>
    )
}
