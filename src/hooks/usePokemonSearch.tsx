import { type FormEvent, useCallback, useState } from "react"
import { getPokemonByType, getPokemonSearchByName } from "../services/PokemonServices"
import type { PokemonInfo } from "../tipos/tipos"

export function usePokemonSearch(setPokemons: React.Dispatch<React.SetStateAction<PokemonInfo[]>>) {
    // const [offset, setOffset] = useState(0)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [mode, setMode] = useState<"default" | "name" | "type">("default");
    const [currentType, setCurrentType] = useState<string | null>(null);


    const handleSearch = useCallback(
        async (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault()

            const form = new FormData(e.currentTarget)
            const rawName = ((form.get("name") as string) || "")
                .trim()
                .toLowerCase()

            if (!rawName) {
                setError("Informe nome ou tipo para buscar")
                return
            }

            setLoading(true)
            setError(null)

            try {

                try {
                    const byName = await getPokemonSearchByName(rawName);
                    setPokemons([byName]);
                    setMode("name");
                    setCurrentType(null);
                } catch {
                    const allByType = await getPokemonByType(rawName);
                    setAllTypeResults(allByType);

                    const initialResults = allByType.slice(0, 10)
                    setPokemons(initialResults);
                    setDisplayedCount(10)
                    setMode("type");
                    setCurrentType(rawName);
                }
            } catch {
                setPokemons([]);
                setError("Pokémon não encontrado ou erro na busca.");
                setMode("default");
                setCurrentType(null);
            } finally {
                setLoading(false);
            }
        },
        [setPokemons]
    );

    // Para busca por tipo, vamos implementar paginação local
    const [allTypeResults, setAllTypeResults] = useState<PokemonInfo[]>([])
    const [displayedCount, setDisplayedCount] = useState(10)

    const loadMoreType = useCallback(() => {
        if (!currentType || mode !== "type") return

        // Aumenta a quantidade de pokémons exibidos
        setDisplayedCount(prev => prev + 10)

        // Atualiza os pokémons exibidos baseado na contagem
        const pokemonsToShow = allTypeResults.slice(0, displayedCount + 10)
        setPokemons(pokemonsToShow)
    }, [currentType, mode, allTypeResults, displayedCount, setPokemons])

    // Função para resetar para o modo padrão
    const resetToDefault = useCallback(() => {
        setMode("default")
        setCurrentType(null)
        setError(null)
        setAllTypeResults([])
        setDisplayedCount(10)
    }, [])

    const hasMoreType = currentType && allTypeResults.length > displayedCount

    return {
        loading,
        error,
        handleSearch,
        mode,
        loadMoreType,
        currentType,
        resetToDefault,
        hasMoreType
    }
}