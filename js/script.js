// --- Function to make a request to the Pokémon API ---

async function fetchPokemonData(pokemonName) {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching Pokémon data:', error);
      return null;
    }
  }
  
  // --- Function to update HTML elements with Pokémon data ---

  function updatePokemonInfo(pokemonData) {
    const displayDiv = document.querySelector('.display');
    const pokemonNameP = document.querySelector('.pokemonName p');
    const bioP = document.querySelector('.bio');
    const shinyP = document.querySelector('.shiny');
  
    // --- Update the HTML content with Pokémon data ---

    if (pokemonData) {
      displayDiv.innerHTML = `<img src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}">`;
      pokemonNameP.textContent = pokemonData.name.toUpperCase();
      bioP.textContent = `Height: ${pokemonData.height / 10}m | Weight: ${pokemonData.weight / 10}kg`;
    } else {
      displayDiv.innerHTML = ''; // Clear the display if no data is available
      pokemonNameP.textContent = 'Pokemon not found';
      bioP.textContent = '';
    }

    shinyP.addEventListener('click', () => {
        displayDiv.innerHTML = `<img src="${pokemonData.sprites.front_shiny}" alt="${pokemonData.name}">`;
    })
  }
  
  // --- Function called when the Search button is clicked ---
  async function searchPokemon() {
    const searchInput = document.querySelector('.searchbar');
    const pokemonName = searchInput.value.trim();
  
    if (pokemonName !== '') {
      // --- Fetch Pokémon data and update HTML elements ---
      const pokemonData = await fetchPokemonData(pokemonName);
      updatePokemonInfo(pokemonData);
    }
  }
  
  // --- Add an event listener to the Search button ---
  document.querySelector('.searchBtn').addEventListener('click', searchPokemon);
  