import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getPokemonByName } from "../../services/PokemonServices";
import type { PokemonInfo } from "../../tipos/tipos";
import { themeConfig } from "../../contexts/theme";
import { ThemeContext } from "../../contexts/ThemeContext";

function PokemonDetails() {
    const { name } = useParams();
    const [pokemon, setPokemon] = useState<PokemonInfo | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { theme, toggleTheme } = useContext(ThemeContext);

    useEffect(() => {
        if (name) {
            getPokemonByName(name)
                .then(data => {
                    setPokemon(data);
                    setLoading(false);
                })
                .catch(error => {
                    setError(`Erro ao buscar dados do Pokémon: ${error.message}`);
                    setLoading(false);
                });
        }
    }, [name]);

    if (loading) return <div>Carregando...</div>;
    if (error) return <div>{error}</div>;
    if (!pokemon) return <div>Nenhum Pokémon encontrado.</div>;

    return (
        <div className={`${themeConfig[theme].layout.textColor}
        max-lg:mt-24`}>
            <div className=" flex justify-between items-center p-2
            min-2xl:text-2xl">
                <button className={`flex justify-center items-center cursor-pointer p-1
                ${themeConfig[theme].card.backgroundColor}
                border-2 rounded ${themeConfig[theme].layout.borderColor}`}>
                    <Link to="/"> Voltar </Link>
                </button>

                <button className='flex justify-center items-center gap-4 cursor-pointer' onClick={toggleTheme}>
                    <img src={`${themeConfig[theme].icon}`} alt="Icone Lua"
                        className='w-6 h-6
                        min-2xl:w-8
                        min-2xl:h-8' />
                </button>
            </div>

            <div className={`flex justify-center items-center gap-4 max-w-3xl p-2.5 rounded
            max-sm:max-w-80
            min-2xl:text-2xl
        ${themeConfig[theme].layout.backgroundColor}
         `}>

                <section className={`flex flex-col justify-center items-center gap-2
             rounded  ${themeConfig[theme].layout.borderColor} border-2
             ${themeConfig[theme].card.backgroundColor}`}>
                    <img src={pokemon.image} alt={pokemon.name}
                        className=" p-0.5" />

                    <p className={`p-0.5 uppercase 
                    max-sm:p-1.5
                border-y ${themeConfig[theme].layout.borderColor}`}>{pokemon.name}</p>

                    <p className="p-1 uppercase
                    max-sm:text-sm
                    ">{pokemon.types.join(', ')}</p>
                </section>

                <div className={`flex flex-col gap-4
                lg:text-lg
             border-l-2 ${themeConfig[theme].layout.borderColor}`}>

                    <div className="max-w-2xs  max-h-48 overflow-y-auto 
                p-1">
                        <h3 className="text-left">Skills:</h3>
                        <p className={`whitespace-normal break-words ${themeConfig[theme].card.backgroundColor} 
                        p-1 rounded
                        `}>{pokemon.skills.join(', ')}</p>
                    </div>

                    <div className="max-w-2xs  max-h-48 overflow-y-auto 
                p-1">
                        <h3>Moves:</h3>
                        <p className={` whitespace-normal break-words
                     ${themeConfig[theme].card.backgroundColor} p-1 rounded `}>{pokemon.moves.join(', ')}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PokemonDetails;