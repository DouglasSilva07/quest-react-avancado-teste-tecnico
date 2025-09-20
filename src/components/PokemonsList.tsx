import { useContext, useEffect, useState } from "react";
import { getMultiplePokemon } from "../services/PokemonServices";
import { Link } from "react-router-dom";
import { themeConfig } from "../contexts/theme";
import { ThemeContext } from "../contexts/ThemeContext";
import { usePokemonSearch } from "../hooks/usePokemonSearch";
import type { PokemonInfo } from "../tipos/tipos";

function PokemonsList() {
    const [pokemons, setPokemons] = useState<PokemonInfo[]>([]);
    const [offset, setOffset] = useState(0);
    const { theme, toggleTheme } = useContext(ThemeContext);
    //const { handleSearch } = usePokemonSearch(setPokemons)
    const {
        handleSearch,
        mode,
        loadMoreType,
        loading,
        error,
        resetToDefault,
        hasMoreType
    } = usePokemonSearch(setPokemons);


    // Função para buscar pokémons a partir de um offset
    const loadPokemons = async (currentOffset: number) => {
        try {
            const novosPokemons = await getMultiplePokemon(10, currentOffset);
            setPokemons(prev => {
                const nomesExistentes = new Set(prev.map(p => p.name));
                const apenasNovos = novosPokemons.filter(p => !nomesExistentes.has(p.name));
                return [...prev, ...apenasNovos];
            });
        } catch (error) {
            console.error('Erro ao buscar Pokémon:', error);
        }
    };

    // Carrega os primeiros pokémons ao montar o componente
    useEffect(() => {
        if (mode === "default") {
            loadPokemons(0);
        }
    }, [mode]);

    // Função chamada ao clicar no botão
    const handleVerMais = () => {
        const novoOffset = offset + 10;
        setOffset(novoOffset);
        loadPokemons(novoOffset);
    };

    const handleBackToDefault = () => {
        resetToDefault();
        setOffset(0);
        setPokemons([]);
        loadPokemons(0);
    };


    return (
        <div className={`flex flex-col justify-center items-center
            ${themeConfig[theme].layout.textColor} `}>
            <div className="flex justify-center items-center gap-8 mb-2.5 max-sm:gap-2.5 max-sm:mb-1.5">
                <form onSubmit={handleSearch}>
                    <input
                        type="text"
                        placeholder='Pesquise aqui seu Pokémon...'
                        name="name"
                        className={`flex justify-center items-center w-2xs ml-10 p-2 
                            max-sm:ml-5
                    ${themeConfig[theme].layout.backgroundColor}
                    rounded border ${themeConfig[theme].layout.borderColor}
                    focus: ${themeConfig[theme].layout.textColor} 
                    focus:outline-none`}
                    />
                </form>


                <button className='flex justify-center items-center  cursor-pointer' onClick={toggleTheme}>

                    <img src={`${themeConfig[theme].icon}`} alt="Alternar tema"
                        className='w-6 h-6
                            max-sm:w-7
                            max-sm:h-7' />
                </button>
            </div>

            {/* Mostrar erro se houver */}
            {error && (
                <div className="mb-4 p-2 rounded bg-red-100 text-red-700 border border-red-300">
                    {error}
                </div>
            )}

            {/* Botão para voltar ao modo padrão quando não estiver no modo default */}
            {mode !== "default" && (
                <button
                    className={`mb-4 p-2 rounded cursor-pointer
                        ${themeConfig[theme].layout.backgroundColor}
                        border ${themeConfig[theme].layout.borderColor}`}
                    onClick={handleBackToDefault}
                >
                Voltar para listagem completa
                </button>
            )}



            <ul className="flex flex-wrap justify-center items-center    
            max-w-4xl 
            gap-3.5 mb-2.5
            max-lg:max-w-2xl">
                {pokemons.map((pokemon) => (
                    <li
                        key={pokemon.name}
                        className={`flex flex-col items-center justify-center
                        w-40 h-auto p-4
                      ${themeConfig[theme].layout.backgroundColor} 
                      ${themeConfig[theme].layout.borderColor} rounded border-2`}
                    >
                        <Link to={`/pokemon/${pokemon.name}`}>
                            <img src={pokemon.image} alt={pokemon.name} className={`w-28 h-auto object-contain mb-2 
                            ${themeConfig[theme].layout.borderColor} rounded border-2
                            ${themeConfig[theme].card.backgroundColor}`} />

                            <p className={`
                                border-2 ${themeConfig[theme].layout.borderColor} rounded text-center
                            ${themeConfig[theme].card.backgroundColor}
                            p-1 uppercase max-w-28 text-xs`}>{pokemon.name}</p>
                        </Link>
                    </li>
                ))}
            </ul>

            {/* <button
                    className={`flex justify-center items-center cursor-pointer p-1
                ${themeConfig[theme].card.backgroundColor}
                  border-2 rounded ${themeConfig[theme].layout.borderColor}`}
                    onClick={handleVerMais}
                >
                    Ver mais
                </button> */}

            {/* Loading indicator */}
            {loading && (
                <div className="mb-4">Carregando...</div>
            )}

            {/* Botões "Ver mais" condicionais baseados no modo */}
            {mode === "default" && (
                <button
                    className={`flex justify-center items-center cursor-pointer p-1
      ${themeConfig[theme].card.backgroundColor}
      border-2 rounded ${themeConfig[theme].layout.borderColor}`}
                    onClick={handleVerMais}
                    disabled={loading}
                >
                    Ver mais
                </button>
            )}

            {mode === "type" && hasMoreType && (
                <button
                    className={`flex justify-center items-center cursor-pointer p-1
      ${themeConfig[theme].card.backgroundColor}
      border-2 rounded ${themeConfig[theme].layout.borderColor}`}
                    onClick={loadMoreType}
                    disabled={loading}
                >
                    Ver mais
                </button>
            )}
        </div>
    );
}

export default PokemonsList;

