import React, { useEffect, useState, useContext } from 'react'
import './App.css'
import Navbar from './components/Navbar';
import Pokedex from './components/Pokedex';
import Searchbar from './components/Searchbar';
import { getPokemonData, getPokemons, searchPokemon } from './api/pokeapi';
import { FavoriteProvider } from './context/FavoriteContext';
import homeImg from './img/home-img.png'
import pikachu from "./img/pikachu.png"
import Videojuegos from './components/Videojuegos';
import Noticias from './components/Noticias'




function App() {
   
    const [pokemons, setPokemons] = useState([]);
    const [page, setPage] = useState(0);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState()
    const [favorites, setFavorites] = useState([]);
    const [notFound, setNotFound] = useState(false)

    const fetchPokemons = async() =>{
        try {
            setLoading(true)
            const data = await getPokemons(8, 8 * page)
            const promises = data.results.map(async (pokemon)=>{
                return await getPokemonData(pokemon.url)   
            })

            const results = await Promise.all(promises)
            setPokemons(results)
            setLoading(false)
            setTotal(Math.ceil(data.count / 8))
            setNotFound(false)
        } catch (error) {
            
        }
    }

    const localStorageKey = ''

    const loadFavorites = () =>{
        const pokemon = JSON.parse(window.localStorage.getItem(localStorageKey)) || [];
        setFavorites(pokemon);
    }

    useEffect(() => {
        fetchPokemons();
    }, [page])

    useEffect(() => {
        loadFavorites();
    }, [])

    const updateFavoritePokemons = (name) =>{
        const updated = [...favorites]
        const isFavorite = favorites.indexOf(name);
        if(isFavorite>=0){
            updated.splice(isFavorite, 1)
        }
        else{
            updated.push(name)
        }
        setFavorites(updated)
        window.localStorage.setItem(localStorageKey, JSON.stringify(updated))
    }


    const onSearch = async (pokemon) => {
        if(!pokemon){
            setNotFound(false)
            return fetchPokemons();
        }
        setNotFound(false)
        setLoading(true);
        
        const result = await searchPokemon(pokemon)
        if(!result){
            setNotFound(true)
            setLoading(false)
        }
        else{
            setPokemons([result])
            setPage(0)
            setTotal(1)
        }
       
        setLoading(false)
    }


    return (
        <FavoriteProvider value={{favoritePokemons:favorites,
            updateFavoritePokemons: updateFavoritePokemons
        }}>

            <main>
                
                <Navbar />
                <div className='contenido'>
                    <section id="inicio" className="section">
                        <div className="inicio">
                            <img src={homeImg} alt="" />
                        </div>
                    </section>
                    <section id="historia" className="section">
                        <div className="historia">
                            <div>      
                                <h2 className="title-section">Historia</h2>
                                <p className="text">
                                    Cuando el creador, Satoshi Tajiri, era joven, uno de sus pasatiempos favoritos era la recolección y colección de insectos. Tajiri se dirigió a la ciudad de Tokio a estudiar, ya que su padre quería que fuese ingeniero. Sin embargo, a Tajiri no le agradaba la idea de estudiar y se dedicaba más a pasatiempos como los videojuegos. Pasó un tiempo y Tajiri llegó a trabajar como jugador de prueba de algunos juegos para revistas, junto a Ken Sugimori, con quien hizo una gran amistad.
                                </p>
                            </div>
                        <img src={pikachu} alt="pikachu" />
                        </div>
                    </section>
                    <div id='pokedex' className='section'>
                        
                        <div className='pokedex'>
                            <div className='head-pokedex'>
                                <h1 className='title-section'>Pokedex</h1>
                                
                                <div className='liked-pokemons'><i className='bx bxs-heart' ></i>{favorites.length}</div>
                                
                            </div>
                            <Searchbar onSearch={onSearch}/>
                            
                                {notFound ? 
                                <div className='loading'>No se encontro el pokemon</div>
                                :
                                <Pokedex 
                                pokemons={pokemons}
                                page={page}
                                setPage={setPage}
                                total={total}
                                loading={loading}
                                />
                                
                                }
                        </div>
                        
                        
                    </div>
                    <Videojuegos />
                    <Noticias />
                </div>
            </main>

         </FavoriteProvider>
    )
}

export default App;
