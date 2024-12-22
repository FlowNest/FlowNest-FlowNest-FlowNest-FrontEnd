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

// Función para desencriptar mensajes
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
// Desencriptar un mensaje
const desencriptarMensaje = (mensajeEncriptado: any, clave: any) => {
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

  const fetchMensajes = async (sender: any, receiver: any) => {
    try {
      console.log("Enviando solicitud a la API...");
      const response = await fetch(
        `http://127.0.0.1:8000/api/messages/getMessagesContact/?sender=${sender}&receiver=${receiver}`
      );

      if (!response.ok) {
        throw new Error(
          `Error al recuperar los mensajes, código: ${response.status}`
        );
      }

      // Verifica si la respuesta tiene contenido
      const text = await response.text(); // Lee la respuesta como texto
      if (!text) {
        console.warn("La respuesta está vacía.");
        return [];
      }

      // Intenta parsear el texto como JSON
      let data;
      try {
        data = JSON.parse(text);
      } catch (jsonError) {
        console.error("Error al parsear la respuesta JSON:", jsonError);
        throw new Error("La respuesta no es un JSON válido.");
      }

      console.log("Datos JSON parseados:", data);

      // Verifica si los datos son válidos
      if (!data || !Array.isArray(data) || data.length === 0) {
        console.warn(
          `No se encontraron mensajes entre ${sender} y ${receiver}`
        );
        return [];
      }

      // Transforma los mensajes si los datos son válidos
      const mensajesTransformados = data.map((mensaje) => ({
        sender: mensaje.sender,
        receiver: mensaje.receiver_id,
        mensaje: desencriptarMensaje(mensaje.content, AES_KEY),
        hora: mensaje.timestamp.split("T")[1].slice(0, 5),
        fecha: mensaje.timestamp.split("T")[0],
      }));

      return mensajesTransformados;
    } catch (error) {
      console.error("Error al recuperar los mensajes:", error);
      return []; // Devuelve un array vacío si ocurre algún error
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
          className="enviarMensaje"
          onSubmit={async (e) => {
            e.preventDefault();

            const inputElement = e.target.querySelector(".mensajeInput");
            const mensaje = inputElement.value.trim();
            const sender = localStorage.getItem("id_user");
            const receiver = contactoId;

            if (!mensaje) {
              alert("El mensaje no puede estar vacío.");
              return;
            }

            try {
              // Enviar el mensaje a la API
              const response = await fetch(
                `http://127.0.0.1:8000/api/messages/`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    sender: sender,
                    content: mensaje,
                    message_type: "text",
                    status: "sent",
                    is_deleted: 0,
                    media_url: null,
                    is_group_message: 0,
                    receiver_id: userContacto,
                  }),
                }
              );

              if (!response.ok) {
                throw new Error("Error al enviar el mensaje");
              }

              // Limpiar el campo de texto después del envío
              inputElement.value = "";

              // Agregar el nuevo mensaje al estado actual sin hacer una nueva solicitud
              const nuevoMensaje = {
                sender: parseInt(sender),
                receiver: receiver,
                mensaje: mensaje, // Este mensaje no necesita desencriptarse ya que lo acabas de enviar
                hora: new Date().toTimeString().slice(0, 5), // Hora actual
                fecha: new Date().toISOString().split("T")[0], // Fecha actual
              };

              setMensajesContacto((prevMensajes) => [
                ...prevMensajes,
                nuevoMensaje,
              ]);
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
          <button
            className="botonMensaje"
            type="submit"
          >
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
