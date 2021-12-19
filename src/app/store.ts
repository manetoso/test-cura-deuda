import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import pokemonListReducer from '../features/pokemonList/pokemonList'
import pokemonInfoReducer from '../features/pokemonInfo/pokemonInfo'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    pokemons: pokemonListReducer,
    pokemonInfo: pokemonInfoReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
