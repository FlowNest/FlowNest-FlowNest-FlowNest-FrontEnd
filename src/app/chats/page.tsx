"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "@/styles/chats.scss";
import "@/styles/pagina-chats.scss";
import { PaginaBienvenida } from "@/components/paginaBienvenida";
import { HeaderPaginas } from "@/components/headerPaginas";
import { ContactoMensaje } from "@/components/contactomensaje";
import { PaginaMensajes } from "@/components/paginaMensajes";
import { Input } from "@nextui-org/input";
import { Icon } from "@iconify/react";

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
  // Lista de contactos como un JSON
  /* const contactos = [
    {
      id: 1,
      url: "https://avatars.githubusercontent.com/u/30373425?v=4",
      nombre: "John Doe",
      mensaje: "¡Hola! ¿Cómo estás?",
      fecha: "2024-12-05",
    },
    {
      id: 2,
      url: "https://avatars.githubusercontent.com/u/4567890?v=4",
      nombre: "Jane Smith",
      mensaje: "¿Te gustaría reunirte mañana?",
      fecha: "2024-12-04",
    },
    {
      id: 3,
      url: "https://avatars.githubusercontent.com/u/789123?v=4",
      nombre: "Michael Brown",
      mensaje: "Gracias por la ayuda de ayer.",
      fecha: "2024-12-03",
    },
    {
      id: 4,
      url: "https://avatars.githubusercontent.com/u/112233?v=4",
      nombre: "Emily Davis",
      mensaje: "¡Felices fiestas!",
      fecha: "2024-12-01",
    },
  ]; */

  //Listar los contactos y mensajes
  const fetchContactos = async (id: any) => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/contacts/getMyContacts/?id=" + id
      );
      if (!response.ok) {
        throw new Error("Error al recuperar los contactos");
      }
      const data = await response.json();
  
      // Transformar los datos para adaptarlos a la interfaz Contacto
      const contactosTransformados = data.map((item: any) => ({
        id: item.contact.id,
        url: "https://avatars.githubusercontent.com/u/30373425?v=4", // Puedes agregar una URL dinámica si es necesario
        nombre: item.contact.alias_name,
        mensaje: item.last_message ? item.last_message.content : "Sin mensajes",
        fecha: item.last_message
        ? item.last_message.timestamp.split("T")[1].slice(0,5)
        : "Sin hora",
      }));
  
      setContactos(contactosTransformados);
      console.log(contactosTransformados);
    } catch (error) {
      console.error("Error al recuperar los contactos:", error);
    }
  };
  
  // Cuando se carga la página, obtener los contactos
  useEffect(() => {
    fetchContactos(localStorage.getItem("id_user"));
  }, []);

  // Estado para rastrear el contacto seleccionado
  const [contactoSeleccionado, setContactoSeleccionado] = useState(null);

  const handleContactoClick = (id: any) => {
    setContactoSeleccionado(id);
  };

  return (
    <div className="contenedorPaginaChats">
      <div className="contactos">
        <HeaderPaginas titulo={"Chats"} />
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
