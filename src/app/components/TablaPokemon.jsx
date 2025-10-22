import React from "react";
import Fila_Pokemon_Tabla from "./Fila_Pokemon_Tabla";

export default function TablaPokemon( {lista_pokemons_actual} ) {
    const estilo_encabezado = "px-6 py-3 text-left text-sm font-semibold text-gray-600";

    return (
        <div className=" rounded-lg shadow overflow-hidden">
        <table className="w-full">
        {/* Encabezado */}
        <thead className="bg-gray-100">
              <tr>
                <th className={estilo_encabezado}>#</th>
                <th className={estilo_encabezado}>Nombre</th>
                <th className={estilo_encabezado}>Vista Previa</th>
                <th className={estilo_encabezado}>Tipos</th>
                <th className={estilo_encabezado}>Habilidades</th>
                <th className="px-6 py-3"></th>
              </tr>
        </thead>
        {/* Componente de tabla */}
            {lista_pokemons_actual.map(poke => (
                <Fila_Pokemon_Tabla key={poke.id} poke = {poke} />
            ))}
            
        </table>

      </div>
    )
}