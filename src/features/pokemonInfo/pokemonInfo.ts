import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

interface PokemonInfoState {
    base_experience: number
    height: number
    name: string
    sprites: {
        back_default: string
        back_shiny: string
        front_default: string
        front_shiny:string
        other: {
            dream_world: {
                front_default: string
            }
        }
    }
    weight: number
}

const initialState:PokemonInfoState = {
    base_experience: 0,
    height: 0,
    name: '',
    sprites: {
        back_default: '',
        back_shiny: '',
        front_default: '',
        front_shiny: '',
        other: {
            dream_world: {
                front_default: ''
            }
        }
    },
    weight: 0
}

export const PokemonInfo = createSlice({
    name: 'pokemonInfo',
    initialState,
    reducers: {
        getInfo: ( state, { payload }:PayloadAction<PokemonInfoState> ) => {
            state.base_experience = payload.base_experience
            state.height = payload.height
            state.name = payload.name
            state.weight = payload.weight
            state.sprites.back_default = payload.sprites.back_default
            state.sprites.back_shiny = payload.sprites.back_shiny
            state.sprites.front_default = payload.sprites.front_default
            state.sprites.front_shiny = payload.sprites.front_shiny
            state.sprites.other.dream_world.front_default = payload.sprites.other.dream_world.front_default
        }
    }
})

export const { getInfo } = PokemonInfo.actions

export const selectPokemonInfo = (state: RootState) => state.pokemonInfo

export default PokemonInfo.reducer