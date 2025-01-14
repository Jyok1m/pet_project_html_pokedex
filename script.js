// Purpose: fetch pokemon data
const getPokemonDataById = async (id = 1) => {
	const baseUrl = "https://pokeapi.co/api/v2/pokemon/";
	const parsedUrl = `${baseUrl}${id}`;

	try {
		const response = await fetch(parsedUrl);
		const data = await response.json();

		const { id, name, types } = data;
		const primaryType = types[0]?.type.name ?? "normal";

		const cardNode = generatePokemonCard({ id, name, primaryType });
		insertPokemonCard(cardNode);
	} catch (error) {
		console.error(error);
	}
};

// Purpose: generate pokemon card structure
const generatePokemonCard = ({ id, name, primaryType }) => {
	// Format data
	id = parseInt(id);
	name = name[0].toUpperCase() + name.slice(1).toLowerCase();
	primaryType = primaryType.toLowerCase();

	return `
    <div class="pokemon ${primaryType}">
      <div class="imgContainer">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png" alt="${name}" />
      </div>
      <div class="info">
        <h3 class="name">${name}</h3>
        <span class="type">Type: <span>${primaryType}</span></span>
      </div>
    </div>
  `;
};

// Purpose: add pokemon card to html
const insertPokemonCard = (cardNode = "") => {
	document.querySelector("#pokemonContainer").innerHTML += cardNode;
};

// Purpose: generate pokemon cards
const generateCardsByBatch = async () => {
	const step = 15;
	const from = document.querySelectorAll(".pokemon").length + 1;
	const to = from + step;

	for (let i = from; i < to; i++) {
		await getPokemonDataById(i);
	}
};

document.onload = (() => {
	// Purpose: generate first batch of pokemon cards on page load
	generateCardsByBatch();

	// Purpose: add event listener to next button
	document.querySelector("#next").addEventListener("click", generateCardsByBatch);
})();
