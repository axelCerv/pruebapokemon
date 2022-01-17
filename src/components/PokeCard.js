import React, { useContext } from 'react'
import FavoriteContext from '../context/FavoriteContext';


function PokeCard(props) {
    const {pokemon} = props;
    const {favoritePokemons, updateFavoritePokemons} = useContext(FavoriteContext)
    
    const checkedHeart = 'bx bxs-heart pokemon-liked liked'
    const uncheckedHeart = 'bx bxs-heart pokemon-liked';
    const heart = favoritePokemons.includes(pokemon.name) ? checkedHeart : uncheckedHeart;

    const clickHeart=(e)=>{
        e.preventDefault();
        updateFavoritePokemons(pokemon.name)
    }
    return (
        <>
                <div className='card'>
                    <i 
                    className={heart} 
                    onClick={clickHeart}
                    ></i>
                    <img src={pokemon.sprites.front_default} alt="" />
                    <div className='num-pokemon'>#{pokemon.id}</div>
                    <div className='name-pokemon'>{pokemon.name}</div>
                    <div className='types'>
                        {
                            pokemon.types.map((type, index)=>{
                                return <div className='type-pokemon' key={index}>{type.type.name}</div>
                            })
                        }
                    </div>
                </div>
        </>
    )
}

export default PokeCard

