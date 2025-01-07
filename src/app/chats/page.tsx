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

const AES_KEY = "cifradoaes202425"; // Clave de cifrado compartida

// Funciones de cifrado y descifrado
function cifrarVigenereHex(mensaje: string, clave: string): string {
  let resultado = "";
  let indiceClave = 0;
  const claveHex = clave.split("").map((char) => char.charCodeAt(0));

  for (let i = 0; i < mensaje.length; i++) {
    const charMensaje = mensaje.charCodeAt(i);
    const charClave = claveHex[indiceClave % claveHex.length];
    const charCifrado = (charMensaje + charClave) % 256;
    resultado += String.fromCharCode(charCifrado);
    indiceClave++;
  }

  return resultado;
}

function descifrarVigenereHex(cifrado: string, clave: string): string {
  let resultado = "";
  let indiceClave = 0;
  const claveHex = clave.split("").map((char) => char.charCodeAt(0));

  for (let i = 0; i < cifrado.length; i++) {
    const charCifrado = cifrado.charCodeAt(i);
    const charClave = claveHex[indiceClave % claveHex.length];
    const charOriginal = (charCifrado - charClave + 256) % 256;
    resultado += String.fromCharCode(charOriginal);
    indiceClave++;
  }

  return resultado;
}

interface Contacto {
  id: number;
  url: string;
  nombre: string;
  mensaje: string;
  fecha: string;
}

const Chats = () => {
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
          ? descifrarVigenereHex(item.last_message.content, AES_KEY)
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