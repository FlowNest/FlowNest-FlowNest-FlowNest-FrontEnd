import React from 'react';
import "@/styles/components/headerPaginas.scss"

type HeaderPaginasProps = {
  titulo: string;
};

export const HeaderPaginas: React.FC<HeaderPaginasProps> = ({ titulo }) => {
  return (
    <div className='contenedorTituloPagina'>
      <h1>{titulo}</h1>
    </div>
  );
};
