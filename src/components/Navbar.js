
import { useState, useEffect} from 'react';
import logo from '../img/logo_pokemon.png'

export default function Navbar() {
    
    const [active, setActive] = useState(false)

    const openMenu = () =>{
       setActive(true)
    }
    const closeMenu = () =>{
        setActive(false)
     }    

    useEffect(() => {
        const itemMenu = document.querySelectorAll('.item-menu');
        const section = document.querySelectorAll('.section')
        const sideNav = document.querySelector('.side-nav')

        function removeActive(){
            itemMenu.forEach((item)=>{
                item.classList.remove('active');
            }) 
        }
        
        itemMenu.forEach((item)=>{
            item.addEventListener('click',()=>{
                removeActive();
                item.classList.add('active');
                sideNav.classList.remove('active');
                setActive(false)
            })
        })
        
        function scrollActive(){
            var lon = section.length;
            while(--lon && window.scrollY  < section[lon].offsetTop + 50 && window.scrollY < section[lon].offsetTop -600){ }
            removeActive();
            itemMenu[lon].classList.add('active');

        }
        scrollActive();
        window.addEventListener('scroll',scrollActive)
        
    }, [])

    return (
        <>
            <div className="menu-responsive">
                <a href="#inicio"><img src={logo} alt="pokemon logo-pokemon" /></a>
                <button className="menu-btn"><i className='bx bx-menu' onClick={openMenu}></i></button>
            </div>

            <nav className={active == false ? 'side-nav' : 'side-nav active'}>
                <button className="close-btn" onClick={closeMenu}><i className='bx bx-plus'></i></button>

                <a href="#inicio" className="logo">
                    <img src={logo} alt="" className='logo'/>
                </a>
                <div className="menu">
                    <div className="item-menu">
                        <span className="selector"></span>
                        <a href="#inicio">Inicio</a>
                    </div>
                    <div className="item-menu ">
                        <span className="selector"></span>
                        <a href="#historia">Historia</a>
                    </div>
                    <div className="item-menu ">
                        <span className="selector"></span>
                        <a href="#pokedex">Pokedex</a>
                    </div>
                    <div className="item-menu">
                        <span className="selector"></span>
                        <a href="#videojuegos">Videojuegos</a>
                    </div>
                    <div className="item-menu">
                        <span className="selector"></span>
                        <a href="#noticias">Noticias</a>
                    </div>
                </div>
                <div className="redes-nav">
                    <a href="https://www.facebook.com/PokemonOficialLatAm/?brand_redir=230809307041021" rel="noreferrer" target="_blank"><i className='bx bxl-facebook'></i></a>
                    <a href="https://www.instagram.com/pokemon/" rel="noreferrer" target="_blank"><i className='bx bxl-instagram' ></i></a>
                    <a href="https://twitter.com/Pokemon" rel="noreferrer" target="_blank"><i className='bx bxl-twitter' ></i></a>
                </div>
            </nav>
        </>
       
    
    )
}
