import React from 'react';
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

type HeaderPaginasProps = {
  titulo: string;
};

export const HeaderPaginasAgregar: React.FC<HeaderPaginasProps> = ({ titulo }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure(); // Hook para manejar el estado del modal

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
                  <Input
                    endContent={
                      <Icon className='iconoAgregar' icon="fluent:person-28-regular" width="28" height="28" />
                    }
                    label="Nombre"
                  />
                  <Input
                    endContent={
                      <Icon  className='iconoAgregar' icon="fluent:call-28-regular" width="28" height="28" />
                    }
                    label="Password"
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onPress={onClose}>
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
