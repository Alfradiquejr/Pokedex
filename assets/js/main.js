const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');


const maxRecords = 151
const limit = 10
let offset = 0;

// FUNÇÃO PARA TRAZER DINÂMICA PARA CADA POKÉM COM SEU NOME, ID,TIPO, ETC...
function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                alt="${pokemon.name}">
            </div>
        </li>
    `
}

// FUNÇÃO PARA LIMITAR O CARREGAMENTO DOS POKÉMONS
function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
} 
loadPokemonItens(offset, limit)

// FILTRAR MAIS POKÉMONS AO CLICAR EM LOADMORE
loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

// FUNÇÃO PARA FILTRAR OS POKÉMONS POR NOME E/OU ID
function filterPokemon() {
    const searchText = searchInput.value.toLowerCase();
    const filteredPokemon = pokemonList.querySelectorAll('.pokemon');

    filteredPokemon.forEach(pokemon => {
        const pokemonName = pokemon.querySelector('.name').textContent.toLowerCase();
        const pokemonNumber = pokemon.querySelector('.number').textContent.toLowerCase();

        if (pokemonName.includes(searchText) || pokemonNumber.includes(searchText)) {
        pokemon.style.display = 'block';
        } else {
        pokemon.style.display = 'none';
        }
    });
}

// FILTRAR AO CLICAR EM SEARCH
searchButton.addEventListener('click', filterPokemon);


// RETORNAR PÁGINA INICIAL AO CLICAR NO H1
pokedexTitle.addEventListener('click', () => {
    searchInput.value = '';
    filterPokemon();
    if (pokemon.length === 0) {
        loadPokemonItens();
    }
})



