"use client";
import Image from "next/image";
import { NextUIProvider } from "@nextui-org/react";
import "@/styles/loguin.scss"
import FormularioLoguin from "@/components/formularioLoguin";



export default function Home() {
  return (
    <NextUIProvider>
      <main className="principal">
        <div className="contenedorFormulario">
          <div className="textoLoguin">
            <h1>Iniciar Sesión</h1>
            <p>Envía mensajes privados con amigos y familiares usando WhatsApp en tu navegador</p>
            <ol>
              <li>Ingresa usuario y contraseña</li>
              <li>Presiona Ingresar</li>
              <li>Disfruta de la aplicación</li>
            </ol>
          </div>
          <div>
            <FormularioLoguin />
          </div>
        </div>
      </main>
    </NextUIProvider>
  );
}
