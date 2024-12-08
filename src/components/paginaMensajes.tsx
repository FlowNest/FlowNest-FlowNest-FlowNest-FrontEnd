import React, { useEffect, useState } from "react";
import "@/styles/components/paginaMensajes.scss";
import { Input } from "@nextui-org/input";
import { Button, ButtonGroup } from "@nextui-org/button";
import { Icon } from "@iconify/react";

// Definimos el tipo de las props
interface PaginaMensajesProps {
  contactoId: number;
}
interface Contacto {
  id: number;
  url: string;
  nombre: string;
  mensaje: string;
  fecha: string;
}
export const PaginaMensajes: React.FC<PaginaMensajesProps> = ({
  contactoId,
}) => {
  const [contactosRegistrados, setContactosRegistrados] = useState<Contacto[]>([]);
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
  const fetchContactosRegistrados = async (id: any) => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/contacts/getMyContacts/?id=" + id
      );
      if (!response.ok) {
        throw new Error("Error al recuperar los contactos");
      }
      const data = await response.json();

      const contactosTransformados = data.map((item: any) => ({
        id: item.contact.id,
        url: "https://avatars.githubusercontent.com/u/30373425?v=4",
        nombre: item.contact.alias_name,
        mensaje: item.last_message ? item.last_message.content : "Sin mensajes",
        fecha: item.last_message
        ? item.last_message.timestamp.split("T")[1].slice(0,5) // Extraer solo la hora
        : "Sin hora",
      }));

      setContactosRegistrados(contactosTransformados);
    } catch (error) {
      console.error("Error al recuperar los contactos:", error);
    }
  };
  useEffect(() => {
    fetchContactosRegistrados(localStorage.getItem("id_user"));
  }, []);

  // Encuentra el contacto que coincide con el contactoId
  const contacto = contactosRegistrados.find((contacto) => contacto.id === contactoId);
  console.log("contacto encontrado", contacto);

  // Si no se encuentra el contacto, mostramos un mensaje de error
  if (!contacto) {
    return <div>Contacto no encontrado</div>;
  }

  return (
    <div className="contenedorPaginaMensajes">
      <div className="headerMensajes">
        <div className="contenedorImagen">
          <img
            src={contacto.url}
            alt={contacto.nombre}
            className="imagen"
          />
        </div>
        <div className="nombreContacto">
          <p className="nombre">{contacto.nombre}</p>
          <p className="fechaConexion">{contacto.fecha}</p>
        </div>
      </div>
      <div className="contenedorMensajes">principal</div>
      <div className="contenedorEnviarMensaje">
        <form
          action=""
          className="enviarMensaje"
        >
          <input
            type="text"
            className="mensajeInput"
          />
          <button className="botonMensaje">
            <Icon
              icon="fluent:send-24-filled"
              width="40"
              height="40"
            />
          </button>
        </form>
      </div>
    </div>
  );
};
