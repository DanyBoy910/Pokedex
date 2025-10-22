import React from "react";
import { Card_Pokemon_Cuadricula } from "./Card_Pokemon_Cuadricula";

export default function CuadriculaPokemon({Lista_pokemons}) {
    return (
        <div className="grid grid-cols-4 grid-rows-3">
        {Lista_pokemons.map((poke) => (
            <Card_Pokemon_Cuadricula key={poke.id} poke={poke} />
        ))}
        </div>
            
    )
}