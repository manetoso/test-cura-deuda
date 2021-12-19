import { useAppSelector } from '../../app/hooks';
import { selectPokemonInfo } from './pokemonInfo';
import { Navigate, useLocation, useNavigate } from "react-router-dom";


export const PokemonInfoComponent = () => {
    const pokemonData = useAppSelector( selectPokemonInfo )
    let navigate = useNavigate()
    let { state } = useLocation();

    const handleBack = () => {
        setTimeout(() => {
            navigate( `/${state}`, { replace: true } )
        }, 300);
    }
    if ( pokemonData.name !== '' ) {
        return (
            <section className='pokemonData'>
                <svg className="pokemonData-back" onClick={handleBack}
                    fill="none" stroke="currentColor"
                    viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                >
                    <path strokeLinecap="round" strokeLinejoin="round"
                    strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                </svg>
                <div className='pokemonData-main'>
                    <div className='pokemonData-main-card'>
                        <img
                            alt='pokemon-sprite'
                            className='pokemonData-main-card-sprite'
                            src={pokemonData.sprites.other.dream_world.front_default}
                        />
                        <h3>{pokemonData.name}</h3>
                    </div>
                    <div className='pokemonData-main-base'>
                        <h2>Características básicas</h2>
                        <div className='pokemonData-main-base-col'>
                            <label>Peso: </label>
                            <span>{pokemonData.weight} <strong>hectogramos</strong></span>
                        </div>
                        <div className='pokemonData-main-base-col'>
                            <label>Altura: </label>
                            <span>{pokemonData.height} <strong>decímetros</strong></span>                
                        </div>
                        <div className='pokemonData-main-base-col'>
                            <label>Experiencia Base: </label>
                            <span>{pokemonData.base_experience} <strong>PE</strong></span>
                        </div>
                    </div>
                </div>
                <div className='pokemonData-sprites'>
                    <h2>Sprites</h2>
                    <div className='pokemonData-sprites-images'>
                        <div className='pokemonData-sprites-images-back'>
                            <img
                                className='pokemonData-sprites-images-back-1'
                                alt='pokemon-sprite-back-default'
                                src={pokemonData.sprites.back_default}
                            />
                            <img
                                className='pokemonData-sprites-images-back-1'
                                alt='pokemon-sprite-back-default'
                                src={pokemonData.sprites.back_shiny}
                            />
                        </div>
                        <div className='pokemonData-sprites-images-front'>
                            <img
                                className='pokemonData-sprites-images-front-1'
                                alt='pokemon-sprite-back-default'
                                src={pokemonData.sprites.front_default}
                            />
                            <img
                                className='pokemonData-sprites-images-front-2'
                                alt='pokemon-sprite-back-default'
                                src={pokemonData.sprites.front_shiny}
                            />
                        </div>
                    </div>
                </div>
            </section>
        )
    } else {
        return (
            <Navigate to={ '/home' } replace />
        )
    }
}
