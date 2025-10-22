import React from "react";
import Button from "./Button";
import { useRouter } from "next/navigation";

export default function Fila_Pokemon_Tabla({ poke }) {
  const style_fila = "px-6 py-4 whitespace-nowrap text-sm text-gray-700";
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
    <tbody onClick={() => abrir_Detalles(poke)} className="divide-y divide-gray-200 hover:shadow-lg cursor-pointer h-full hover:bg-gray-100">
        <tr key={poke.id}>
          <td className={style_fila}>{poke.id}</td>
          <td className={style_fila}>{poke.nombre}</td>
          <td>
            <img
               className="h-30 w-30 object-contain inline-block"
              src={poke.imagen.front_default}
              alt={poke.nombre}
              
            />
          </td>
          <td className={style_fila}>
            {poke.tipo.map((tp, i) => (
              <div key={i}>{tp}</div>
            ))}
          </td>
          <td className={style_fila}>
            {poke.habilidades.map((hab, i) => (
              <div key={i}>{hab}</div>
            ))}
          </td>
          <td>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                abrirVentana(poke);
              }}
            >
              Shiny
            </Button>
          </td>
        </tr>
    </tbody>
  );
}
