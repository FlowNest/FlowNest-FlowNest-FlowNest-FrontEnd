
import React, { useState } from 'react';
import "@/styles/components/headerPaginas.scss";
import { Icon } from "@iconify/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Input,
  Link,
} from "@nextui-org/react";

type User = {
  id: number;
  username: string;
  phone_number: string;
};

type HeaderPaginasProps = {
  titulo: string;
};

export const HeaderPaginasAgregar: React.FC<HeaderPaginasProps> = ({ titulo }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleAddContact = async () => {
    setErrorMessage('');
    setSuccessMessage('');

    try {
      // Verificar si el número existe en la API de usuarios
      const userResponse = await fetch('http://127.0.0.1:8000/api/users/');
      const users: User[] = await userResponse.json();

      const existingUser = users.find(
        (user) => user.phone_number === phoneNumber
      );

      if (existingUser) {
        // Crear el contacto usando el usuario encontrado
        const newContact = {
          alias_name: name,
          user: 4, // Cambia este valor al ID del usuario actual autenticado
          contact: existingUser.id, // ID del usuario encontrado
        };

        const addResponse = await fetch('http://127.0.0.1:8000/api/contacts/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newContact),
        });

        if (addResponse.ok) {
          setSuccessMessage('Contacto agregado exitosamente.');
          setName('');
          setPhoneNumber('');
          onOpenChange(); // Cierra el modal

          // Recargar la página después de agregar el contacto
          setTimeout(() => {
            window.location.reload(); // Recarga la página
          }, 1000); // Espera 1 segundo para mostrar el mensaje de éxito
        } else {
          setErrorMessage('Error al agregar el contacto.');
        }
      } else {
        setErrorMessage('El número de teléfono no está registrado.');
      }
    } catch {
      setErrorMessage('Hubo un error al procesar la solicitud.');
    }
  };

  return (
    <div className='contenedorTituloPagina contenedorTituloPaginaAgregar'>
      <h1>{titulo}</h1>
      <div>
        <Button variant='solid' onPress={onOpen}>
          <Icon icon="fluent:chat-add-28-regular" width="28" height="28" />
        </Button>
        <Modal className='modal' isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">Agregar contacto</ModalHeader>
                <ModalBody>
                  {errorMessage && <p className="error">{errorMessage}</p>}
                  {successMessage && <p className="success">{successMessage}</p>}
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    endContent={
                      <Icon className='iconoAgregar' icon="fluent:person-28-regular" width="28" height="28" />
                    }
                    label="Nombre"
                  />
                  <Input
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    endContent={
                      <Icon className='iconoAgregar' icon="fluent:call-28-regular" width="28" height="28" />
                    }
                    label="Teléfono"
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onPress={handleAddContact}>
                    Agregar
                  </Button>
                  <Button color="danger" variant="flat" onPress={onClose}>
                    Cancelar
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
};