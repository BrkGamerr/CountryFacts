const heroButton = document.getElementById("exploreButton");
const countryCardTemplate = document.querySelector("[data-countries-template]");
const countryCardContainer = document.querySelector("[data-country-container]");
const searchInput = document.querySelector("[data-search]")

let countries = []

heroButton.addEventListener("click", heroButtonClick)


function heroButtonClick() {
	document.getElementById("searchDiv").scrollIntoView({behavior: "smooth"});
}


searchInput.addEventListener("input", e => {
	const value = e.target.value.toLowerCase();
	countries.forEach(country => {
		const isVisible =
			country.name.toLowerCase().includes(value);
		country.element.classList.toggle("hide", !isVisible)
	})
})


fetch("data.json")
	.then(response => response.json())
	.then(data => {
		countries = data.map(country => {
			const card = countryCardTemplate.content.cloneNode(true).children[0];
			const image = card.querySelector("[data-image]");
			const countryName = card.querySelector("[data-country-name]");
			image.src = `flags/${country.name}.png`;
			countryName.textContent = country.name;
			countryCardContainer.append(card);
			return {name: country.name, element: card}
		})
	})
