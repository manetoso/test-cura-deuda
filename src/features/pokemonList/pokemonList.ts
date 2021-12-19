import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

interface PokemonListState {
    next: string | null
    previous: string | null
    results: PokemonData[]
}

interface PokemonData {
    name: string
    url: string
}

const initialState:PokemonListState = {
    next: null,
    previous: null,
    results: []
}

export const PokemonList = createSlice({
    name: 'pokemonList',
    initialState,
    reducers: {
        getPokemons: ( state, { payload }:PayloadAction<PokemonListState> ) => {
            state.next = payload.next
            state.previous = payload.previous
            state.results = payload.results
        }
    }
})

export const { getPokemons } = PokemonList.actions

export const selectPokemons = (state: RootState) => state.pokemons.results;
export const selectPokemonsListNext = (state: RootState) => state.pokemons.next;
export const selectPokemonsListPrevious = (state: RootState) => state.pokemons.previous;

export default PokemonList.reducer