import {
    Home,
    Search,
    PokemonInfo
} from '../pages/'

interface Route {
    to: string;
    path: string;
    Component: () => JSX.Element;
    name: string;
    isOnNavbar: boolean
}

export const routes:Route[] = [
    {
        to: '/home',
        path: 'home',
        Component: Home,
        name: 'Inicio',
        isOnNavbar: true
    },
    {
        to: '/search',
        path: 'search',
        Component: Search,
        name: 'Búsqueda',
        isOnNavbar: true
    },
    {
        to: '/pokemon-info',
        path: 'pokemon-info',
        Component: PokemonInfo,
        name: 'Pokemon',
        isOnNavbar: false
    },
]