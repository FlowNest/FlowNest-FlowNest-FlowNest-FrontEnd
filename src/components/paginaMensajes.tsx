import React, { useEffect, useState } from "react";
import "@/styles/components/paginaMensajes.scss";
import { Input } from "@nextui-org/input";
import { Icon } from "@iconify/react";
import { MensajeEmisor } from "./mensajeEmisor";
import { MensajeReceptor } from "./mensajeReceptor";

interface PaginaMensajesProps {
  contactoId: number;
}
interface Contacto {
  id: number;
  url: string;
  nombre: string;
  mensaje: string;
  fecha: string;
  contact: string;
}

interface Mensaje {
  sender: number;
  receiver: number;
  mensaje: string;
  hora: string;
  fecha: string;
}

export const PaginaMensajes: React.FC<PaginaMensajesProps> = ({
  contactoId,
}) => {
  const [contactosRegistrados, setContactosRegistrados] = useState<Contacto[]>(
    []
  );
  const [mensajesContacto, setMensajesContacto] = useState<Mensaje[]>([]);
  const [userContacto, setUserContacto] = useState<string>("");

  // Obtener contactos registrados
  const fetchContactosRegistrados = async (id: string) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/contacts/getMyContacts/?id=${id}`
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
          ? item.last_message.timestamp.split("T")[1].slice(0, 5)
          : "Sin hora",
        contact: item.contact.contact.toString(),
      }));

      setContactosRegistrados(contactosTransformados);

      const contactoEncontrado = contactosTransformados.find(
        (contacto: any) => contacto.id === contactoId
      );

      if (contactoEncontrado) {
        setUserContacto(contactoEncontrado.contact);
      }
    } catch (error) {
      console.error("Error al recuperar los contactos:", error);
    }
  };

  // Obtener mensajes del contacto
  const fetchMensajes = async (sender: string, receiver: string) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/messages/getMessagesContact/?sender=${sender}&receiver=${receiver}`
      );
      if (!response.ok) {
        throw new Error("Error al recuperar los mensajes");
      }
      const data = await response.json();

      const mensajesTransformados = data.map((mensaje: any) => ({
        sender: mensaje.sender,
        receiver: mensaje.receiver_id,
        mensaje: mensaje.content,
        hora: mensaje.timestamp.split("T")[1].slice(0, 5),
        fecha: mensaje.timestamp.split("T")[0],
      }));

      return mensajesTransformados;
    } catch (error) {
      console.error("Error al recuperar los mensajes:", error);
      return [];
    }
  };

  useEffect(() => {
    const idUsuario = localStorage.getItem("id_user");
    if (idUsuario) {
      fetchContactosRegistrados(idUsuario);
    }
  }, [contactoId]);

  useEffect(() => {
    if (userContacto) {
      const idUsuario = localStorage.getItem("id_user");
      if (idUsuario) {
        Promise.all([
          fetchMensajes(userContacto, idUsuario), // Mensajes enviados por el contacto
          fetchMensajes(idUsuario, userContacto), // Mensajes enviados por el usuario actual
        ])
          .then(([mensajesEnviados, mensajesRecibidos]) => {
            // Combina y ordena los mensajes cronológicamente
            const todosLosMensajes = [
              ...mensajesEnviados,
              ...mensajesRecibidos,
            ].sort(
              (a, b) =>
                new Date(`${a.fecha}T${a.hora}`).getTime() -
                new Date(`${b.fecha}T${b.hora}`).getTime()
            );
            setMensajesContacto(todosLosMensajes);
          })
          .catch((error) =>
            console.error("Error al cargar los mensajes:", error)
          );
      }
    }
  }, [userContacto]);

  const contacto = contactosRegistrados.find(
    (contacto) => contacto.id === contactoId
  );

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
      <div className="contenedorMensajes">
        {mensajesContacto.map((mensaje, index) => {
          if (mensaje.sender.toString() === localStorage.getItem("id_user")) {
            return (
              <MensajeEmisor
                key={index}
                mensaje={mensaje.mensaje}
                hora={mensaje.hora}
                fecha={mensaje.fecha}
              />
            );
          } else {
            return (
              <MensajeReceptor
                key={index}
                mensaje={mensaje.mensaje}
                hora={mensaje.hora}
                fecha={mensaje.fecha}
              />
            );
          }
        })}
      </div>
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
