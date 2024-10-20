let pokemonData = [];

// Fetch data from mock server
async function fetchPokemon() {
  try {
    const response = await fetch("http://localhost:3000/pokemon");
    if (!response.ok) {
      throw new Error("HTTP call failed");
    }
    const data = await response.json();
    pokemonData = data;
    renderApp();
  } catch (error) {
    console.error("Failed to fetch Pokémon data:", error);
    renderApp();
  }
}

// ini untuk menambahkan card
function PokemonCard(props) {
  return React.createElement(
    "div",
    {
      className:
        "pokemon-card p-4 m-4 w-64 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-lg shadow-lg transform transition duration-300 hover:scale-105",
    },
    React.createElement("img", {
      src: props.image,
      alt: props.name,
      className: "w-full h-48 object-contain",
    }),
    React.createElement(
      "h2",
      { className: "text-xl font-bold mt-2" },
      props.name
    ),
    React.createElement("p", { className: "text-md" }, `Type: ${props.types}`)
  );
}

// List component
function PokemonList() {
  if (pokemonData.length === 0) {
    return React.createElement(
      "p",
      { className: "text-center text-xl text-gray-500" },
      "Loading Pokémon data..."
    );
  }

  return React.createElement(
    "div",
    { className: "flex flex-wrap justify-center" },
    pokemonData.map((pokemon) =>
      React.createElement(PokemonCard, {
        key: pokemon.id,
        name: pokemon.name,
        types: pokemon.types.join("/"),
        // URL for HD images from official-artwork
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`,
      })
    )
  );
}

// App component wraps header and list
function App() {
  return React.createElement(
    "div",
    { className: "app-container bg-gray-100 min-h-screen" },
    React.createElement(
      "header",
      {
        className:
          "app-header py-6 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 text-white text-center",
      },
      React.createElement("h1", { className: "text-5xl font-bold" }, "Pokedex")
    ),
    React.createElement(PokemonList, null)
  );
}

// Function to render the app
function renderApp() {
  ReactDOM.render(React.createElement(App), document.getElementById("root"));
}

// Initial render
renderApp();

// Fetch and display the Pokémon data
fetchPokemon();
