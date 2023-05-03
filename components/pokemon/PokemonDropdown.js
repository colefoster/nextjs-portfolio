import { useState, useEffect } from "react";
import axios from "axios";
function PokemonDropdown() {

    const [pokemonList, setPokemonList] = useState([]);

    const [prompt, setPrompt] = useState('');
    const [imageSrc, setImageSrc] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(prompt);
        try {
            const response = await axios.post('/api/generateImage', { prompt });
            const { data } = response;
            setImageSrc(data.imageUrl);
          } catch (error) {
            console.error('Error generating image:', error.message);
          }
      };

  useEffect(() => {
    const getPokemon = async () => {
      const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0');
      const data = await res.json();
      setPokemonList(data);
    }
    getPokemon();
  }, []);


    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const [pokemonData, setPokemonData] = useState('');
    
    useEffect(() => {
        if (selectedPokemon) {
            const getPokemon = async () => {
                const res = await fetch(`/api/scraper?pokemon=${selectedPokemon}&number=${pokemonList.results.findIndex(pokemon => pokemon.name === selectedPokemon) + 1}`);
                const data = await res.json();
                console.log(data);
                setPokemonData(data);
            }
            getPokemon();
        }
    }, [selectedPokemon]);


    return (
        <div >
            <select className=" scrollbar scrollbar-thumb-gray-900 scrollbar-track-gray-100 bg-gray-900 text-white overflow-scroll" value={selectedPokemon || ""} onChange={(e) => setSelectedPokemon(e.target.value)}>
                <option value="">Select a Pokémon</option>
                {pokemonList.results && pokemonList.results.map((pokemon, index) => (
                    
                    <option key={index} value={pokemon.name}>{pokemon.name}</option>
                     
                ))}
            </select>
            <div className="text-white">
                {selectedPokemon && (
                <p>Selected Pokémon: {selectedPokemon}</p>)}

                {pokemonData && (
                    <img src={pokemonData.image} alt="pokemon" />)
                }

                {pokemonData && (
                <p>Pokémon Biology: {(pokemonData.description)}</p>)}
                
            </div>
            <div className="">
                <form onSubmit={handleSubmit}>
                    <input
                    type="text"
                    className="text-black"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Enter text prompt"
                    />
                    <button type="submit">Generate Image</button>
                </form>
                {imageSrc && <img src={imageSrc} alt="Generated" />}
                </div>
        </div>
    );
}

export default PokemonDropdown;