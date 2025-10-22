import React from "react";

export default function Paginacion({ pokemonsPorPagina, totalPokemons, cambiarPagina, paginaActual }) {
  // --- Lógica para generar los números de página ---
  const paginasParaMostrar = [];
  const totalPaginas = Math.ceil(totalPokemons / pokemonsPorPagina);
  const pag_lateral = 1; 
  
  if (totalPaginas > 1) {
    paginasParaMostrar.push(1);

    // 2. Calcula el rango de páginas alrededor de la actual
    let inicio = Math.max(2, paginaActual - pag_lateral);
    let fin = Math.min(totalPaginas - 1, paginaActual + pag_lateral);

    if (inicio > 2) {
      paginasParaMostrar.push('...');
    }
    for (let i = inicio; i <= fin; i++) {
      paginasParaMostrar.push(i);
    }

    if (fin < totalPaginas - 1) {
      paginasParaMostrar.push('...');
    }
    
    if (totalPaginas > 1) {
      paginasParaMostrar.push(totalPaginas);
    }
  }

  return (
    <nav className="mt-4 flex justify-center">
      <ul className="inline-flex -space-x-px">
        {paginasParaMostrar.map((numero, index) => (
          <li key={index}> 
            {typeof numero === 'number' ? (
              // Es un botón de página normal
              <a
                onClick={() => cambiarPagina(numero)}
                href="#"
                className={`px-3 py-2 leading-tight border border-gray-300 ${
                  paginaActual === numero
                    ? 'bg-red-500 text-white'
                    : 'bg-white text-gray-500 hover:bg-gray-100'
                }`}
              >
                {numero}
              </a>
            ) : (
              // Es '...' y no es clickeable
              <span className="px-3 py-2 leading-tight border border-gray-300 bg-white text-gray-500">
                {numero}
              </span>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}