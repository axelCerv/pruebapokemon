import React, { useState } from 'react'

export default function Searchbar(props) {
    const {onSearch} = props
    const [search,setSearch] = useState('');
    
    const onChange = (e) => {
        setSearch(e.target.value);
            if(e.target.value.length === 0){
                onSearch(null)
            }
    }

    const searchBtn = async (e) =>{
            onSearch(search);
    }
    const onKeyPress= (e)=>{
        if (e.key === 'Enter'){
            searchBtn();
        }
    }

    return (
        <>
            <div className='search'>
                <input 
                type="text" 
                placeholder='Busacar pokemon...'
                onChange={onChange}
                className='input-search'
                onKeyDown={onKeyPress}
                />
                <button 
                onClick={searchBtn}
                className='btn-search'>
                    <i className='bx bx-search-alt'></i>
                </button>
            </div>
        </>
    )
}
