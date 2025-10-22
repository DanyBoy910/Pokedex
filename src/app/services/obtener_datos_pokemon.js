export default async function obtener_datos_pokemon() {
    try {
        const n_pokemones = 100
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${n_pokemones}`);
        const data = await response.json();
        
        const pokemonDetallado = await Promise.all(
            data.results.map(async (pokemon) => {
                const detalleResponse = await fetch(pokemon.url);
                const detalle = await detalleResponse.json();
                return {
                    id: detalle.id,
                    nombre: detalle.name,
                    tipo: detalle.types.map(t => t.type.name),
                    habilidades: detalle.abilities.map(a => a.ability.name),
                    imagen: detalle.sprites
                };
            })
        );
        
        return pokemonDetallado;
        
    } catch (error) {
        console.error('Error en obtener_datos_pokemon:', error);
        throw error;
    }
}