import axios from 'axios'
import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../app/hooks'
import { getInfo } from '../features/pokemonInfo/pokemonInfo'
import { useForm } from '../hooks/useForm'

let urlPokeData = 'https://pokeapi.co/api/v2/pokemon/'

interface IPokeData {
    name: string
    sprite: string
    isFounded: boolean
    msg: string
}

export const Search = () => {
    const dispatch = useAppDispatch()
    let navigate = useNavigate()
    const {
        onChange, resetForm, query
    } = useForm({
        query: ''
    })
    const [pokeData, setPokeData] = useState<IPokeData>({
        name: '',
        sprite: '',
        isFounded: false,
        msg: 'Busca un pokemon'
    })

    const handleSubmit = ( event: FormEvent<HTMLFormElement> ) => {
        event.preventDefault()
        console.log( query.toLowerCase() )
        axios.get( `${urlPokeData}${query.toLowerCase()}` )
            .then( ({data}) => {
                setPokeData({
                    name: data.name,
                    sprite: data.sprites.other.dream_world.front_default,
                    isFounded: true,
                    msg: 'Pokemon Encontrado'
                })
            })
            .catch( ( err ) => {
                console.warn( err )
                setPokeData({
                    name: '',
                    sprite: '',
                    isFounded: false,
                    msg: 'Pokemon No Encontrado'
                })
            })
        resetForm()
    }
    const handleNavigate = async ( pokemonName:string ) => {
        pokemonName = pokemonName.toLowerCase()
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
            navigate( '/pokemon-info', { state: 'search' } )
        }, 500);
    }

    return (
        <>
            <div className='search'>
                <h1 className='search-title'>Busca un pokemon</h1>
                <form
                    noValidate
                    onSubmit={ handleSubmit }
                    className='search-form'
                >
                    <input
                        type="text"
                        placeholder="pikachu"
                        name="query"
                        value={ query }
                        onChange={ onChange }
                        autoComplete='off'
                        className='search-form-input'
                    />
                    <button
                        type='submit'
                        className='search-form-button'
                    >
                        Buscar
                    </button>
                </form>
                <span
                    className={`search-msg ${
                        pokeData.isFounded ? 'founded'
                        : pokeData.msg === 'Busca un pokemon' ? '' : 'not-founded'
                    }`}
                >{pokeData.msg}</span>
            </div>
            {
                pokeData.isFounded &&
                <div
                    onClick={ () => {
                        handleNavigate(pokeData.name)
                    }}
                    className='pokemonData-main-card' 
                    style={{
                        cursor: 'pointer'
                    }}
                >
                    <img
                        alt='pokemon-sprite'
                        className='pokemonData-main-card-sprite'
                        src={pokeData.sprite}
                    />
                    <h3>{pokeData.name}</h3>
                </div>
            }
        </>
    )
}
