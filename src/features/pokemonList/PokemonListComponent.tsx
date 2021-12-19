import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
    getPokemons,
    selectPokemons,
    selectPokemonsListNext,
    selectPokemonsListPrevious
} from './pokemonList';
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { getInfo } from '../pokemonInfo/pokemonInfo';

let url = 'https://pokeapi.co/api/v2/'
let urlPokeData = 'https://pokeapi.co/api/v2/pokemon/'

export const PokemonListComponent = () => {
    const pokemons = useAppSelector( selectPokemons )
    const next = useAppSelector( selectPokemonsListNext )
    const previous = useAppSelector( selectPokemonsListPrevious )
    const dispatch = useAppDispatch()
    let navigate = useNavigate()

    useEffect(() => {
        url += 'pokemon?limit=10'
        axios.get( url )
            .then( ({ data }) => {
                dispatch( getPokemons(data) )
            })
            .catch( ( err ) => {
                console.warn( err )
            })
    }, [dispatch])

    const handlePaginationNext = ( endPoint:string ) => {
        axios.get( endPoint )
            .then( ({ data }) => {
                dispatch( getPokemons(data) )
            })
            .catch( ( err ) => {
                console.warn( err )
            })
    }
    const handlePaginationPrevious = ( endPoint:string ) => {
        axios.get( endPoint )
            .then( ({ data }) => {
                dispatch( getPokemons(data) )
            })
            .catch( ( err ) => {
                console.warn( err )
            })
    }
    const handleNavigate = async ( pokemonName:string ) => {
        await axios.get( `${urlPokeData}${pokemonName}` )
            .then( ({ data }) => {
                dispatch( getInfo({
                    base_experience: data.base_experience,
                    height: data.height,
                    name: data.name,
                    weight: data.weight,
                    sprites: {
                        back_default: data.sprites.back_default,
                        back_shiny: data.sprites.back_shiny,
                        front_default: data.sprites.front_default,
                        front_shiny: data.sprites.front_shiny,
                        other: {
                            dream_world: {
                                front_default: data.sprites.other.dream_world.front_default
                            }
                        }
                    }
                }) )
            })
            .catch( ( err ) => {
                console.warn( err )
            })
        setTimeout(() => {
            navigate( '/pokemon-info', { replace: true, state: 'home' } )
        }, 500);
    }

    return (
        <section className='pokemonlist'>
            <h1>Echa un vistazo a la lista de pokemons</h1>
            <ul className='pokemonlist-list'>
                {
                    pokemons.map( (pokemon) => (
                        <li
                            key={pokemon.name}
                            onClick={ () => {
                                handleNavigate( pokemon.name )
                            }}
                            className='pokemonlist-list-item'
                        >
                            { pokemon.name }
                            <svg
                                className="pokemonlist-list-item-svg" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    strokeLinecap="round" strokeLinejoin="round"
                                    strokeWidth="2" d="M9 5l7 7-7 7"
                                ></path>
                            </svg>
                        </li>
                    ))
                }
            </ul>
            <div className='pokemonlist-buttons'>
                <button onClick={ () => {
                    if ( next === null ) return
                    handlePaginationNext( next )
                }}
                    className='pokemonlist-buttons-button'
                    disabled={ next === null ? true : false }
                >
                        Siguiente
                </button>
                <button onClick={ () => {
                    if ( previous === null ) return
                    handlePaginationPrevious( previous )
                }}
                    className='pokemonlist-buttons-button'
                    disabled={ previous === null ? true : false }
                >
                        Anterior
                </button>
            </div>
        </section>
    )
}
