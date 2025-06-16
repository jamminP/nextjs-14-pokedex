import { configureStore } from "@reduxjs/toolkit"
import pokemonReducer from './slices/pokemonSlice';

export const makeStore = () => 
    configureStore({
        reducer: {
            pokemon: pokemonReducer
        }
    });