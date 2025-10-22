import React from "react";
import Button from "./Button";
import { useRouter } from "next/navigation";

export function Card_Pokemon_Cuadricula({ id, poke }) {
  const router = useRouter();

  const abrirVentana = (poke) => {
    const parametros = new URLSearchParams({
      id: poke.id,
      nombre: poke.nombre,
    }).toString();

    const nuevaVentana = `/ventana_emergente_shiny?${parametros}`;
    console.log("PARAMETROS: ", parametros);
    window.open(nuevaVentana, "Ventana Shiny", "width=400,height=400");
  };

  const abrir_Detalles = (poke) => {
    const parametros = new URLSearchParams({
      id: poke.id
    }).toString();
    router.push(`/pantalla_detalles?${parametros}`);
  }

  return (
    <div
      onClick={() => abrir_Detalles(poke)}
      className="border rounded-lg p-4 m-1 flex flex-col border-gray-300 hover:shadow-lg cursor-pointer h-full"
    >
      {/* Imagen del Pokémon */}
      <img
        src={poke.imagen.front_default}
        alt={poke.nombre}
        className=" mb-2 self-center "
      />

      {/* Nombre */}
      <div className="items-center">
        <h2 className="text-lg font-semibold mb-1 text-gray-700 text-center">
          {poke.nombre}
        </h2>

        {/* Habilidades */}
        <div className="flex justify-evenly mb-2 mt-2 flex-wrap">
          {poke.habilidades.map((hab, i) => (
            <div
              key={i}
              className="text-sm self-center text-gray-500 mr-1 mb-1 bg-gray-200 rounded-md px-1 py-1"
            >
              {hab}
            </div>
          ))}
        </div>

        <div className="flex flex-row justify-between items-center mt-auto">
          {/* Tipos */}
          <div className="flex flex-wrap items-center ">
            {poke.tipo.map((tp, i) => (
              <div
                key={i}
                className="inline-block text font-semibold text-gray-700 mr-5"
              >
                {tp}
              </div>
            ))}
          </div>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              abrirVentana(poke);
            }}
          >
            Shiny
          </Button>
        </div>
      </div>
    </div>
  );
}
