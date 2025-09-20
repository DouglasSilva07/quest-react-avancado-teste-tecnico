import { Route, Routes } from "react-router-dom"
import PokemonCard  from "./pokemonCard"
import PokemonSpecifics from "./PokemonSpecifics"

const AppRoutes = () => (

    <Routes>
        <Route path='/' element={<PokemonCard/> } />
        <Route path='/pokemon/:name' element={<PokemonSpecifics />} />
    </Routes>
)

export { AppRoutes }