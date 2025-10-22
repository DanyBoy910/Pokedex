"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import Button from "../components/Button";
import { useRouter } from "next/navigation";

export default function PantallaDetalles() {
  const estilo_flecha =
    "text-black text-5xl self-center py-2 hover:text-red-500 cursor-pointer select-none";
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const router = useRouter();
  const [poke_detalle, set_DetalleDataPokemon] = useState(null); //Solo para extraer su descripción
  const [poke, set_DataPokemon] = useState(null); //Extraer todo tipo de info e imágenes.
  const [imageUrls, setImageUrls] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(2);
  useEffect(() => {
    const fetchPokemon = async () => {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const pokemon_data_json = await response.json();
      const nombre = pokemon_data_json.name;

      const response_detallada = await fetch(
        `https://pokeapi.co/api/v2/pokemon-species/${nombre}`
      );
      const detalle_pokemon_json = await response_detallada.json();
      
      const urls = []
      for (const key in pokemon_data_json.sprites) {
          const value = pokemon_data_json.sprites[key];

          // Si el valor es una URL
          if (typeof value === "string") {
            urls.push(value);
          }
        }

      set_DetalleDataPokemon(detalle_pokemon_json);
      set_DataPokemon(pokemon_data_json);
      setImageUrls(urls)
    };

    fetchPokemon();
  }, [id]);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + imageUrls.length) % imageUrls.length);
  };

  if (!poke || !poke_detalle) {
    return <div>Cargando...</div>;
  }

  function volver_MenuPrincipal(){
    router.push(`/pantalla_principal`);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 w-full">
       <h1 className="text-black text-4xl m-10">Detalles de Pokemon</h1>
      <div className="flex justify-center w-full mb-8 justify-items-center">
        <button onClick={prevImage}  className={estilo_flecha}>◄</button>
        {/* IMAGEN POKEMON */}
        <div className="bg-gray-200 flex items-center justify-center p-5 rounded-md mb-4">
          <img
            src={imageUrls[currentImageIndex]}
            alt={poke.name}
            className="w-80 h-80"
          />
        </div>
        <button onClick={nextImage} className={estilo_flecha}>►</button>
      </div>

      <div className="flex mb-10">
        {/* DETALLES POKEMON */}
        {/* Nombre de Pokemon */}
        <div className="flex flex-col">
          <div className="flex flex-col border p-6 rounded-lg">
            <div className="flex justify-center">
              <h3 className="text-3xl mb-4 text-gray-800 justify-left ">{poke.name}</h3>
              <div className=" space-x-4 mb-4 ml-10 flex justify-center">
                {/* Tipo(s) del Pokémon */}
                {poke.types.map((typeInfo, index) => (
                  <span
                    key={index}
                    className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm self-center mr-2"
                    >
                    {typeInfo.type.name}
                  </span>
                ))}
              </div>
            </div>
            {/*Descripción*/}
            <p className="text-left text-gray-600 max-w-md">
                {poke_detalle?.flavor_text_entries?.find(entry => entry.language.name === 'en')?.flavor_text.replace(/\f/g, ' ')}
            </p>
          </div>
          {/* Habilidades */}
          <div className="flex flex-col border p-6 rounded-lg justify-center">
            <div className="flex flex-col mb-4">
              <h3 className="text-3xl mb-4 text-gray-800 self-center ">
                {poke.abilities.map((ability, index) => (
                  <span
                    key={index}
                    className="bg-gray-500 text-white px-3 py-1 rounded-full text-sm self-center mr-2"
                  >
                    {ability.ability.name}
                  </span>
                ))}
              </h3>
            </div>
            {/*Descripción*/}
            <p className="text-center text-gray-600">
              {poke_detalle?.generation?.name}
            </p>
          </div>
        </div>

        {/* Movimiento */}
        <div className="flex flex-col border p-5 rounded-lg ml-2 h-72">
          <h2 className="text-3xl mb-4 text-gray-800 ">Movimientos</h2>
          <div className="overflow-y-auto h-full">
            <ol className="list-decimal list-inside pl-6">
              {poke.moves.map((move, index) => (
                <li key={index} className="text-gray-600">
                  {move.move.name}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
       <Button onClick={()=>volver_MenuPrincipal()}>Volver al menú principal</Button>
    </div>
  );
}
