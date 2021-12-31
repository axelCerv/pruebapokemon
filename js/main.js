

// ======================PAGINACION=======================
let pagina = 0;

const btnAnterior = document.getElementById('btn-anterior');
const btnSiguente = document.getElementById('btn-siguiente');

const chekBtn = ()=>{
    if (pagina <=0){
        btnAnterior.classList.add('disabled')   
    }else if(pagina>0){
        btnAnterior.classList.remove('disabled')   
    }
}
chekBtn();

btnSiguente.addEventListener('click',() => {
    pagina += 8;
    cargarPokemon()
    chekBtn();
});

btnAnterior.addEventListener('click',()=>{
    pagina -= 8 
    cargarPokemon();
    chekBtn();
})



// ============================CARGAR POKEMONES====================

const cargarPokemon = async()=>{
        let pokemons = '';
    
        const url = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=8&offset=${pagina}`);

        const pokedata = await url.json();

        
            pokedata.results.forEach((pokemon=>{  
                
                const loadData = async() =>{
                    const pokeurl = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
                    const pokedata = await pokeurl.json();
                    let tipoHtml = ''
                    const tipoPoke = pokedata.types;
                    tipoPoke.forEach((e)=>{
                        let colorType = '';
                        switch(e.type.name){
                            case 'grass':
                                colorType = '#8dbf39'
                                break;
                            case 'poison':
                                colorType = '#ab58fe'
                                break;
                            case 'fire':
                                colorType = '#f06938'
                                break;
                            case 'water':
                                colorType = '#7aebff'
                                break;
                            case 'flying':
                                colorType = '#c4ffef'
                                break;
                            case 'bug':
                                colorType = '#beff6e'
                                break;
                            case 'normal':
                                colorType = '#bababa'
                                break;
                            default:
                                colorType = 'var(--amarillo)'
                                break;
                        }
    
                        tipoHtml += `<span class="type-pokemon" style="background:${colorType};">${e.type.name}</span>`
                    })
                    pokemons += `<div class="card">
                                <img src="${pokedata.sprites.front_default}" alt="${pokedata.name}">
                                <span class="num-pokemon">#${pokedata.id}</span>
                                <h3 class="name-pokemon">${pokedata.name}</h3>
                                <div class="types">
                                    ${tipoHtml}
                                </div>
                        </div>`
                    document.querySelector('.cards').innerHTML = pokemons;
                }
                loadData();
                
            }))   
        
       
    
}
cargarPokemon();

const cleanItems = () =>{
    let card = document.querySelectorAll('.card');
            card.forEach((e)=>{
                e.remove();
            })
}


const inputPoke = document.querySelector('.input-search');
const btnSearch = document.querySelector('.btn-search');

const searchPokemon = async() =>{
    const urlSearch = await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1118`);
    const db = await urlSearch.json();
    let pokeDB = db.results;
    let pokemons = '';

    let validate = false;

    pokeDB.forEach((poke)=>{
        
        const loadData = async() =>{
            
            const pokeurl = await fetch(poke.url);
            const pokedata = await pokeurl.json();
            let tipoHtml = ''
            const tipoPoke = pokedata.types;
            tipoPoke.forEach((e)=>{
                let colorType = '';
                switch(e.type.name){
                    case 'grass':
                        colorType = '#8dbf39'
                        break;
                    case 'poison':
                        colorType = '#ab58fe'
                        break;
                    case 'fire':
                        colorType = '#f06938'
                        break;
                    case 'water':
                        colorType = '#7aebff'
                        break;
                    case 'flying':
                        colorType = '#c4ffef'
                        break;
                    case 'bug':
                        colorType = '#beff6e'
                        break;
                    case 'normal':
                        colorType = '#bababa'
                        break;
                    default:
                        colorType = 'var(--amarillo)'
                        break;
                }

                tipoHtml += `<span class="type-pokemon" style="background:${colorType};">${e.type.name}</span>`
            })
            
            pokemons += `<div class="card">
                            <img src="${pokedata.sprites.front_default}" alt="${pokedata.name}">
                            <span class="num-pokemon">#${pokedata.id}</span>
                            <h3 class="name-pokemon">${pokedata.name}</h3>
                            <div class="types">
                                ${tipoHtml}
                            </div>
                        </div>`
            
            
            document.querySelector('.cards').innerHTML = pokemons;
        }
        if(poke.name == inputPoke.value.toLowerCase() ){
            loadData()
            validate = true;
        }
    });

    if(validate){
        cleanItems();
    }
    else if(inputPoke.value === ''){
        cleanItems();
        cargarPokemon();
    }

    
    
    
}
btnSearch.addEventListener('click',()=>{
    searchPokemon();
});
inputPoke.addEventListener('keydown', (tecla)=>{
    if(tecla.key === 'Backspace'){
        if(inputPoke == ''){
            inputPoke.value = '';
            cleanItems();
        }
        
        searchPokemon();
        
    }
    else if(tecla.key === 'Enter'){
        searchPokemon();
    }
})
inputPoke.addEventListener('blur', searchPokemon);
inputPoke.addEventListener('keyup', searchPokemon)


// ----------------------------NAV MENU SCRIPTS-----------------------

// -------CLICK ACTIVE

const itemMenu = document.querySelectorAll('.item-menu');

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
    })
})

// -------SCROLL ACTIVE
const section = document.querySelectorAll('.section');
function scrollActive(){
    var lon = section.length;
    while(--lon && window.scrollY + 50 < section[lon].offsetTop && window.scrollY < section[lon].offsetTop -600){}
    removeActive();
    itemMenu[lon].classList.add('active');
}
scrollActive();
window.addEventListener('scroll',scrollActive)


// ------------RESPONSIVE MENU
const menuBtn = document.querySelector('.menu-btn');
const sideNav = document.querySelector('.side-nav')
const closeBtn = document.querySelector('.close-btn');

menuBtn.addEventListener('click',()=>{
    sideNav.classList.add('active');

});
closeBtn.addEventListener('click',()=>{
    sideNav.classList.remove('active');

})

