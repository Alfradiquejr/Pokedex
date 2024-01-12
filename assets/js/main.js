
function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon">
                <span class="number">#001</span>
                <span class="name">${pokemon.name}</span>

                <div class="detail">
                    <ol class="types">
                        <li class="type">grass</li>
                        <li class="type">poison</li>
                    </ol>
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png" alt="${pokemon.name}">
            </div>
        </li>
    `
}

const listPokemon = document.getElementById('listPokemon')

pokeApi.getPokemons().then((pokemons = []) => {
    listPokemon.innerHTML += pokemons.map(convertPokemonToLi).join('')
})
