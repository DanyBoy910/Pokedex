"use client";
import React from "react";
import Button from "@/app/components/Button";
import TablaPokemon from "../components/TablaPokemon";
import Paginacion from "@/app/components/Paginacion";
import { useState, useEffect } from "react";
import obtener_datos_pokemon from "../services/obtener_datos_pokemon";
import CuadriculaPokemon from "../components/CuadriculaPokemon";

export default function pantalla_principal() {
  const [es_lista, setEsLista] = useState(true);
  const estiloActivo = "bg-red-500 text-white"; // Estilo para el botón seleccionado
  const estiloInactivo = "bg-white text-gray-700 hover:bg-gray-100"; // Estilo para el no seleccionado

  const [lista_pokemon, setTodosLosPokemons] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [pokemonsPorPagina] = useState(5);
  const [buscar_Pokemon, setBuscaPokemon] = useState("");

  useEffect(() => {
    obtener_datos_pokemon().then((data) => {
      setTodosLosPokemons(data);
    });
  }, []);

  // Paginación y Filtrado
  const pokemonsFiltrados = lista_pokemon.filter((pokemon) =>
    pokemon.nombre.toLowerCase().includes(buscar_Pokemon.toLowerCase())
  );

  const indiceUltimoPokemon = paginaActual * pokemonsPorPagina;
  const indicePrimerPokemon = indiceUltimoPokemon - pokemonsPorPagina;
  const lista_pokemon_actual = pokemonsFiltrados.slice(
    indicePrimerPokemon,
    indiceUltimoPokemon
  );

  const realizar_busqueda = (event) => {
    setBuscaPokemon(event.target.value);
    setPaginaActual(1);
  };
  const cambiarPagina = (numeroPagina) => setPaginaActual(numeroPagina);

  return (
    <div className="min-h-screen bg-gray-50 p-8 justify-between">
      <div className="justify-center flex">
        <img className="w-10 h-10 mr-1 mb-2" alt="Pokedex_logo" src="https://user-images.githubusercontent.com/9741252/81717987-83b84000-947b-11ea-9ac9-5ad1d59adf7a.png"></img>
        <h1 className="text-black font-bold text-3xl text-center mt-1 ">Pokédex</h1>
      </div>
      
      <div className="flex justify-between">
        <div className=" flex border border-gray-300 px-3 py-2 rounded text-gray-800">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-9 text-gray-300"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>

          <input
            type="text"
            placeholder="Buscar Pokémon"
            className=" focus:outline-none focus:ring-0"
            value={buscar_Pokemon}
            onChange={realizar_busqueda}
          />
        </div>
        <div className="flex justify-end">
          <Button
            onClick={() => setEsLista(true)}
            className={es_lista ? estiloActivo : estiloInactivo}
          >
            Lista
          </Button>
          <Button
            onClick={() => setEsLista(false)}
            className={es_lista ? estiloInactivo : estiloActivo}
          >
            Cuadricula
          </Button>
        </div>
      </div>
      {es_lista ? (
        <TablaPokemon lista_pokemons_actual={lista_pokemon_actual} />
      ) : (
        <CuadriculaPokemon Lista_pokemons={lista_pokemon_actual} />
      )}

      <Paginacion
        pokemonsPorPagina={pokemonsPorPagina}
        totalPokemons={pokemonsFiltrados.length}
        cambiarPagina={cambiarPagina}
        paginaActual={paginaActual}
      />
    </div>
  );
}
