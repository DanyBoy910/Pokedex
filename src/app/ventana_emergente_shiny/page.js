"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function VentanaEmergenteShiny() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const nombre = searchParams.get("nombre");

  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    const fetchPokemonImages = async () => {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const pokemon_data = await response.json();

      const urls = [];

      function extraer_url(json) {
        for (const key in pokemon_data.sprites) {
          const value = pokemon_data.sprites[key];

          // Si el valor es una URL
          if (typeof value === "string" && key.includes("front")) {
            urls.push(value);
          }
        }
      }

      extraer_url(pokemon_data.sprites);  

      // ----------------------------------------------------

      setImageUrls(urls); // Guardamos las URLs en el estado
    };

    fetchPokemonImages();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center capitalize mb-4 text-black">
        {nombre}
      </h1>
      <div className="flex flex-wrap justify-center gap-4">
        {imageUrls.map((url, index) => (
          <img
            key={index}
            src={url}
            alt={`${nombre} sprite ${index + 1}`}
            className="w-24 h-24  bg-gray-100 rounded-md"
          />
        ))}
      </div>
    </div>
  );
}
