"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "@/styles/chats.scss";
import "@/styles/pagina-chats.scss";
import { PaginaBienvenida } from "@/components/paginaBienvenida";
import { HeaderPaginasAgregar } from "@/components/headerPaginasAgregar";
import { ContactoMensaje } from "@/components/contactomensaje";
import { PaginaMensajes } from "@/components/paginaMensajes";
import { Input } from "@nextui-org/input";
import { Icon } from "@iconify/react";

// Configuración AES
const AES_KEY = "cifradoaes202425"; // Clave de desencriptación

// S-Box inversa
const aesInverseSBox = [
  [
    0x52, 0x09, 0x6a, 0xd5, 0x30, 0x36, 0xa5, 0x38, 0xbf, 0x40, 0xa3, 0x9e,
    0x81, 0xf3, 0xd7, 0xfb,
  ],
  [
    0x7c, 0xe3, 0x39, 0x82, 0x9b, 0x2f, 0xff, 0x87, 0x34, 0x8e, 0x43, 0x44,
    0xc4, 0xde, 0xe9, 0xcb,
  ],
  [
    0x54, 0x7b, 0x94, 0x32, 0xa6, 0xc2, 0x23, 0x3d, 0xee, 0x4c, 0x95, 0x0b,
    0x42, 0xfa, 0xc3, 0x4e,
  ],
  [
    0x08, 0x2e, 0xa1, 0x66, 0x28, 0xd9, 0x24, 0xb2, 0x76, 0x5b, 0xa2, 0x49,
    0x6d, 0x8b, 0xd1, 0x25,
  ],
  [
    0x72, 0xf8, 0xf6, 0x64, 0x86, 0x68, 0x98, 0x16, 0xd4, 0xa4, 0x5c, 0xcc,
    0x5d, 0x65, 0xb6, 0x92,
  ],
  [
    0x6c, 0x70, 0x48, 0x50, 0xfd, 0xed, 0xb9, 0xda, 0x5e, 0x15, 0x46, 0x57,
    0xa7, 0x8d, 0x9d, 0x84,
  ],
  [
    0x90, 0xd8, 0xab, 0x00, 0x8c, 0xbc, 0xd3, 0x0a, 0xf7, 0xe4, 0x58, 0x05,
    0xb8, 0xb3, 0x45, 0x06,
  ],
  [
    0xd0, 0x2c, 0x1e, 0x8f, 0xca, 0x3f, 0x0f, 0x02, 0xc1, 0xaf, 0xbd, 0x03,
    0x01, 0x13, 0x8a, 0x6b,
  ],
  [
    0x3a, 0x91, 0x11, 0x41, 0x4f, 0x67, 0xdc, 0xea, 0x97, 0xf2, 0xcf, 0xce,
    0xf0, 0xb4, 0xe6, 0x73,
  ],
  [
    0x96, 0xac, 0x74, 0x22, 0xe7, 0xad, 0x35, 0x85, 0xe2, 0xf9, 0x37, 0xe8,
    0x1c, 0x75, 0xdf, 0x6e,
  ],
  [
    0x47, 0xf1, 0x1a, 0x71, 0x1d, 0x29, 0xc5, 0x89, 0x6f, 0xb7, 0x62, 0x0e,
    0xaa, 0x18, 0xbe, 0x1b,
  ],
  [
    0xfc, 0x56, 0x3e, 0x4b, 0xc6, 0xd2, 0x79, 0x20, 0x9a, 0xdb, 0xc0, 0xfe,
    0x78, 0xcd, 0x5a, 0xf4,
  ],
  [
    0x1f, 0xdd, 0xa8, 0x33, 0x88, 0x07, 0xc7, 0x31, 0xb1, 0x12, 0x10, 0x59,
    0x27, 0x80, 0xec, 0x5f,
  ],
  [
    0x60, 0x51, 0x7f, 0xa9, 0x19, 0xb5, 0x4a, 0x0d, 0x2d, 0xe5, 0x7a, 0x9f,
    0x93, 0xc9, 0x9c, 0xef,
  ],
  [
    0xa0, 0xe0, 0x3b, 0x4d, 0xae, 0x2a, 0xf5, 0xb0, 0xc8, 0xeb, 0xbb, 0x3c,
    0x83, 0x53, 0x99, 0x61,
  ],
  [
    0x17, 0x2b, 0x04, 0x7e, 0xba, 0x77, 0xd6, 0x26, 0xe1, 0x69, 0x14, 0x63,
    0x55, 0x21, 0x0c, 0x7d,
  ],
];

// Función para desencriptar mensajes
const desencriptarMensaje = (mensajeEncriptado: string, clave: string) => {
  // Ajustar clave a 16 bytes
  clave = clave.padEnd(16, "\0");

  // Dividir el mensaje en bytes
  const mensajeBytes = mensajeEncriptado
    .match(/.{2}/g)
    .map((byte: any) => parseInt(byte, 16));

  // Aplicar la S-Box inversa
  const mensajeSBoxInversa = mensajeBytes.map((byte: any) => {
    const fila = byte >> 4;
    const columna = byte & 0x0f;
    return aesInverseSBox[fila][columna];
  });

  // XOR con la clave
  const claveBytes = clave.split("").map((char: any) => char.charCodeAt(0));
  const mensajeOriginal = mensajeSBoxInversa.map(
    (byte: any, index: any) => byte ^ claveBytes[index]
  );

  // Convertir a texto
  return String.fromCharCode(...mensajeOriginal).trim();
};

interface Contacto {
  id: number;
  url: string;
  nombre: string;
  mensaje: string;
  fecha: string;
}

const Chats = () => {
  const router = useRouter();
  const [contactos, setContactos] = useState<Contacto[]>([]);

  // Obtener contactos y desencriptar mensajes
  const fetchContactos = async (id: any) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/contacts/getMyContacts/?id=${id}`
      );
      if (!response.ok) {
        throw new Error("Error al recuperar los contactos");
      }
      const data = await response.json();

      // Transformar datos y desencriptar mensajes
      const contactosTransformados = data.map((item: any) => ({
        id: item.contact.id,
        url: "https://avatars.githubusercontent.com/u/30373425?v=4", // URL por defecto o dinámica
        nombre: item.contact.alias_name,
        mensaje: item.last_message
          ? desencriptarMensaje(item.last_message.content, AES_KEY)
          : "Sin mensajes",
        fecha: item.last_message
          ? item.last_message.timestamp.split("T")[1].slice(0, 5)
          : "Sin hora",
      }));

      setContactos(contactosTransformados);
      console.log(contactosTransformados);
    } catch (error) {
      console.error("Error al recuperar los contactos:", error);
    }
  };

  // Obtener contactos al cargar la página
  useEffect(() => {
    const idUsuario = localStorage.getItem("id_user");
    if (idUsuario) {
      fetchContactos(idUsuario);
    }
  }, []);

  // Estado para rastrear el contacto seleccionado
  const [contactoSeleccionado, setContactoSeleccionado] = useState<
    number | null
  >(null);

  const handleContactoClick = (id: number) => {
    setContactoSeleccionado(id);
  };

  return (
    <div className="contenedorPaginaChats">
      <div className="contactos">
        <HeaderPaginasAgregar titulo={"Chats"} />
        <div className="buscador">
          <Input
            placeholder="Buscar..."
            variant="flat"
            startContent={
              <Icon
                className="iconoBuscar"
                icon="fluent:search-32-regular"
                width="32"
                height="32"
              />
            }
          />
        </div>
        {contactos.map((contacto, index) => (
          <div
            key={contacto.id || `contacto-${index}`}
            onClick={() => handleContactoClick(contacto.id)}
            style={{ cursor: "pointer" }}
          >
            <ContactoMensaje
              url={contacto.url}
              nombre={contacto.nombre}
              mensaje={contacto.mensaje}
              fecha={contacto.fecha}
            />
          </div>
        ))}
      </div>
      <div className="mensajes">
        {contactoSeleccionado ? (
          <PaginaMensajes contactoId={contactoSeleccionado} />
        ) : (
          <PaginaBienvenida />
        )}
      </div>
    </div>
  );
};

export default Chats;
