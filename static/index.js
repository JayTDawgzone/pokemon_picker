
function pokemonchanger(pokemon) {
    pokemon = event.target.value;
    d3.json(`https://pokeapi.co/api/v2/pokemon/${pokemon}`).then(data => {
        pokemonInfo(data);
        statgraph(data);
    })
}

function statgraph(pokemonData){

    let x = pokemonData.stats.map(stat => stat.stat.name);
    let y = pokemonData.stats.map(stat => stat.base_stat);
    var yRange = [0,120];//Set range

    var layout  = {
       title: `${pokemonData.name.toUpperCase()} BASE STATS`,
       yaxis: {
          range:yRange //Set range
      }}


    var data = [
        {
          x: x,
          y: y,
          type: 'bar'
        }
      ];
      
      Plotly.newPlot('statgraph', data, layout);
} 

function pokemonInfo(pokemonData) {
    console.log(pokemonData);
    // Image Update
    let img = d3.select("#pokemon-img");
    img.attr("src", pokemonData.sprites.other['official-artwork']['front_default']);

    // Change Header Name

    //
    d3.select('#pokemon-name').html("");


    if (pokemonData.types.length > 1)  {
        d3.select("#pokemon-name").html(`${pokemonData.name.toUpperCase()} <span class="badge bg-primary">${pokemonData.types[0]['type']['name']}</span>
        <span class="badge bg-secondary">${pokemonData.types[1]['type']['name']}</span>`);
    } else {
        d3.select("#pokemon-name").html(`${pokemonData.name.toUpperCase()} <span class="badge bg-primary">${pokemonData.types[0]['type']['name']}</span>`)
    }



}

function init() {
    d3.json('https://pokeapi.co/api/v2/pokemon/bulbasaur').then(data => {
        statgraph(data);
        pokemonInfo(data);
    })
}

init();
d3.select('#pokemon-input').on('change',pokemonchanger);


