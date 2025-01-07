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

export const PaginaMensajes: React.FC<PaginaMensajesProps> = ({
  contactoId,
}) => {
  const [contactosRegistrados, setContactosRegistrados] = useState<Contacto[]>([]);
  const [mensajesContacto, setMensajesContacto] = useState<Mensaje[]>([]);
  const [userContacto, setUserContacto] = useState<string>("");

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
        mensaje: item.last_message
          ? descifrarVigenereHex(item.last_message.content, AES_KEY)
          : "Sin mensajes",
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

  const fetchMensajes = async (sender: string, receiver: string) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/messages/getMessagesContact/?sender=${sender}&receiver=${receiver}`
      );

      if (!response.ok) {
        throw new Error(
          `Error al recuperar los mensajes, código: ${response.status}`
        );
      }

      const data = await response.json();

      const mensajesTransformados = data.map((mensaje) => ({
        sender: mensaje.sender,
        receiver: mensaje.receiver_id,
        mensaje: descifrarVigenereHex(mensaje.content, AES_KEY),
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
          fetchMensajes(userContacto, idUsuario),
          fetchMensajes(idUsuario, userContacto),
        ])
          .then(([mensajesEnviados, mensajesRecibidos]) => {
            const todosLosMensajes = [
              ...mensajesEnviados,
              ...mensajesRecibidos,
            ].sort(
              (a, b) =>
                new Date(a.fecha + " " + a.hora).getTime() -
                new Date(b.fecha + " " + b.hora).getTime()
            );
            setMensajesContacto(todosLosMensajes);
          })
          .catch((error) => console.error("Error combinando mensajes:", error));
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
          <img src={contacto.url} alt={contacto.nombre} className="imagen" />
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
          className="enviarMensaje"
          onSubmit={async (e) => {
            e.preventDefault();

            const inputElement = e.target.querySelector(".mensajeInput");
            const mensaje = inputElement.value.trim();
            const sender = localStorage.getItem("id_user");
            const receiver = userContacto;

            if (!mensaje) {
              alert("El mensaje no puede estar vacío.");
              return;
            }

            const mensajeCifrado = cifrarVigenereHex(mensaje, AES_KEY);

            try {
              const response = await fetch(`http://127.0.0.1:8000/api/messages/`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  sender: sender,
                  content: mensajeCifrado,
                  message_type: "text",
                  status: "sent",
                  is_deleted: 0,
                  media_url: null,
                  is_group_message: 0,
                  receiver_id: receiver,
                }),
              });

              if (!response.ok) {
                throw new Error("Error al enviar el mensaje");
              }

              inputElement.value = "";

              const nuevoMensaje = {
                sender: parseInt(sender),
                receiver: parseInt(receiver),
                mensaje: mensaje,
                hora: new Date().toTimeString().slice(0, 5),
                fecha: new Date().toISOString().split("T")[0],
              };

              setMensajesContacto((prevMensajes) => [...prevMensajes, nuevoMensaje]);
            } catch (error) {
              console.error("Error al enviar el mensaje:", error);
              alert("Error al enviar el mensaje.");
            }
          }}
        >
          <input
            type="text"
            className="mensajeInput"
            placeholder="Escribe un mensaje..."
          />
          <button className="botonMensaje" type="submit">
            <Icon icon="fluent:send-24-filled" width="40" height="40" />
          </button>
        </form>
      </div>
    </div>

  );
};
