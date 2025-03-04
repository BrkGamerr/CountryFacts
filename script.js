// --------- const Variables Declaration --------- //
const exploreButton = document.getElementById("exploreButton");
const scrollTopButton = document.getElementById("scrollTopButton");

const searchInput = document.querySelector("[data-search-input]")
const cardsDiv = document.querySelector("[data-cards-div]");
const cardsTemplate = document.querySelector("[data-cards-template]");

// --------- let Variables Declaration --------- //
let countries = []

// --------- Functions Section --------- //
function exploreButtonClick() {
	document.getElementById("searchDiv").scrollIntoView({behavior: "smooth"});
}

function scrollTopButtonClick() {
	document.getElementById("heroSection").scrollIntoView({behavior: "smooth"});
}

// --------- Event Listeners Section --------- //
exploreButton.addEventListener("click", exploreButtonClick)
scrollTopButton.addEventListener("click", scrollTopButtonClick)

searchInput.addEventListener("input", e => {
	const value = e.target.value.toLowerCase();
	countries.forEach(country => {
		const isVisible =
			country.name.toLowerCase().includes(value);
		country.element.classList.toggle("hide", !isVisible)
	})
})

// --------- Fetching Section --------- //
fetch("data.json")
	.then(response => response.json())
	.then(data => {
		countries = data.map(country => {
			const card = cardsTemplate.content.cloneNode(true).children[0];
			const cardImage = card.querySelector("[data-card-image]");
			const cardName = card.querySelector("[data-card-name]");
			cardImage.src = `flags/${country.name}.png`;
			cardName.textContent = country.name;
			cardsDiv.append(card);
			return {name: country.name, element: card}
		})
	})
