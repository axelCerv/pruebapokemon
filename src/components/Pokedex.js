import React, { useState, useEffect } from 'react'
import PokeCard from './PokeCard';


export default function Pokedex(props) {

    const [backBtn, setBackBtn] = useState("btn-pages");
    const [nextBtn, setNextBtn] = useState("btn-pages")

    const {pokemons, page, setPage, total, loading} = props;

    const lastPage= () =>{
        const nextPage = page - 1
        setPage(nextPage)
        
    }

    const nextPage = () =>{
        const nextPage = page + 1
        setPage(nextPage)
        
    }
    useEffect(() => {
        if(page === 0){
            setBackBtn("btn-pages disabled")
        }
        else{
            setBackBtn("btn-pages")
        }

        if(page === total - 1){
            setNextBtn("btn-pages disabled")
        }else{
            setNextBtn("btn-pages")
        }
    }, [page, total])

    return (
        <div>
            <div className='header-pokedex'>
                <div className='paginacion'>
                    <button className={backBtn} onClick={lastPage}>
                        <i className='bx bxs-chevron-left' ></i>
                    </button>

                    <div className='pags'>{page + 1} de {total}</div>

                    <button className={nextBtn} onClick={nextPage}>
                        <i className='bx bxs-chevron-right' ></i>
                    </button>
                </div>
            </div>
            {
                loading ? 
                <div className='loading'>
                    <i className='bx bx-loader-circle bx-spin bx-flip-horizontal' ></i>
                    Cargando...
                </div>
                :
                <div className='cards'> 
                {!pokemons 
                
                ? 
                    <div className='loading'>
                    Cargando...
                    </div> 
                    
                : 

                pokemons.map((pokemon, idx)=>{
                    return <PokeCard pokemon = {pokemon} key={idx}/>
                })
                       
                }
            </div>
            }
            
        </div>
    )
}
