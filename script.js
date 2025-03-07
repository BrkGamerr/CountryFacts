// --------- const Variables Declaration --------- //
const exploreButton = document.getElementById("exploreButton");
const scrollTopButton = document.getElementById("scrollTopButton");
const randomButton = document.getElementById("randomButton");

const searchInput = document.querySelector("[data-search-input]");

const cardsDiv = document.querySelector("[data-cards-div]");
const cardsTemplate = document.querySelector("[data-cards-template]");

const overlay = document.getElementById("overlay");

const europeNavigationLink = document.getElementById("europe");
const northAmericaNavigationLink = document.getElementById("northAmerica");
const asiaNavigationLink = document.getElementById("asia");
const southAmericaNavigationLink = document.getElementById("southAmerica");
const africaNavigationLink = document.getElementById("africa");
const oceaniaNavigationLink = document.getElementById("oceania");

// --------- let Variables Declaration --------- //
let countries = [];

let modalDivIds = [];

let modal = {};

let randomModal = {};

let searchInputValue = "";

// --------- Functions Section --------- //
function exploreButtonClick() {
	document.getElementById("searchDiv").scrollIntoView({behavior: "smooth"});
}

function scrollTopButtonClick() {
	document.getElementById("heroSection").scrollIntoView({behavior: "smooth"});
}

function randomButtonClick() {
	if (searchInputValue.length > 0) {
		searchInputValue = "";
		searchInput.value = "";
		countries.forEach(country => {
			country.element.classList.remove("hide");
		})
	}
	const randomIndex = Math.floor(Math.random() * modalDivIds.length);
	const randomModalId = modalDivIds[randomIndex];
	randomModal = document.querySelector(`#${randomModalId}`);
	openModal(randomModal);
}

function openModal(modal) {
	if (modal == null) return;
	modal.classList.add("active");
	overlay.classList.add("active");
}

function closeModal(modal) {
	if (modal == null) return;
	modal.classList.remove("active");
	overlay.classList.remove("active");
}

function filterByContinent(countries, key, value) {
	return countries.filter(country => country[key] === value);
}

function navigationLinkEvents(value) {
	searchInput.value = value;
	
	const inputEvent = new Event('input', {
		bubbles: true,
		cancelable: true,
	});
	searchInput.dispatchEvent(inputEvent);
	
	const changeEvent = new Event('change', {
		bubbles: true,
		cancelable: true,
	});
	searchInput.dispatchEvent(changeEvent);
}

// --------- Event Listeners Section --------- //
exploreButton.addEventListener("click", exploreButtonClick)
scrollTopButton.addEventListener("click", scrollTopButtonClick)
randomButton.addEventListener("click", randomButtonClick)

europeNavigationLink.addEventListener("click", () => {
	navigationLinkEvents("europe");
	searchInput.click();
})
northAmericaNavigationLink.addEventListener("click", () => {
	navigationLinkEvents("north-america");
	searchInput.click();
})
asiaNavigationLink.addEventListener("click", () => {
	navigationLinkEvents("asia");
	searchInput.click();
})
southAmericaNavigationLink.addEventListener("click", () => {
	navigationLinkEvents("south-america");
	searchInput.click();
})
africaNavigationLink.addEventListener("click", () => {
	navigationLinkEvents("africa");
	searchInput.click();
})
oceaniaNavigationLink.addEventListener("click", () => {
	navigationLinkEvents("oceania");
	searchInput.click();
})

searchInput.addEventListener("input", e => {
	
	searchInputValue = e.target.value.toLowerCase();

	countries.forEach(country => {
		const isVisible =
			country.name.toLowerCase().includes(searchInputValue);
		country.element.classList.toggle("hide", !isVisible)
	})

	switch (searchInputValue) {
		case "europe":
			const europeCountries = filterByContinent(countries, "continent", "europe");
			europeCountries.forEach(country => {
				country.element.classList.remove("hide");
			})
			break;
		case "north-america":
			const northAmericaCountries = filterByContinent(countries, "continent", "north-america");
			northAmericaCountries.forEach(country => {
				country.element.classList.remove("hide");
			})
			break;
		case "asia":
			const asiaCountries = filterByContinent(countries, "continent", "asia");
			asiaCountries.forEach(country => {
				country.element.classList.remove("hide");
			})
			break;
		case "south-america":
			const southAmericaCountries = filterByContinent(countries, "continent", "south-america");
			southAmericaCountries.forEach(country => {
				country.element.classList.remove("hide");
			})
			break;
		case "africa":
			const africaCountries = filterByContinent(countries, "continent", "africa");
			africaCountries.forEach(country => {
				country.element.classList.remove("hide");
			})
			break;
		case "oceania":
			const oceaniaCountries = filterByContinent(countries, "continent", "oceania");
			oceaniaCountries.forEach(country => {
				country.element.classList.remove("hide");
			})
			break;
	}
})

overlay.addEventListener("click", () => {
	try {
		closeModal(modal);
	} catch(SyntaxError) {
		closeModal(randomModal);
	} finally {
		const modals = document.querySelectorAll("[data-card-modal-div]")
		modals.forEach(modal => {
			closeModal(modal);
		});
	}
})

// --------- Fetching Section --------- //
fetch("data.json")
	.then(response => response.json())
	.then(data => {
		countries = data.map(country => {
			const card = cardsTemplate.content.cloneNode(true).children[0];
			const modalButton = card.querySelector("[data-card-button]");
			const cardImage = card.querySelector("[data-card-image]");
			const cardName = card.querySelector("[data-card-name]");
			const modalDiv = card.querySelector("[data-card-modal-div]");
			const modalTitle = card.querySelector("[data-card-modal-title]");
			const modalCapital = card.querySelector("[data-card-modal-capital]");
			const modalLanguage = card.querySelector("[data-card-modal-language]");
			const modalPopulation = card.querySelector("[data-card-modal-population]");
			const modalArea = card.querySelector("[data-card-modal-area]");
			const modalCurrency = card.querySelector("[data-card-modal-currency]");
			modalButton.setAttribute("data-modal-target", `#${(country.name).replace(/\s/g, "")}`);
			modalDiv.classList.add(country.continent);
			modalDiv.id = `${(country.name).replace(/\s/g, "")}`;
			modalDivIds.push(modalDiv.id);
			cardImage.src = `flags/${country.name}.png`;
			cardName.textContent = country.name;
			modalTitle.textContent = country.name;
			modalCapital.textContent = country.capital;
			modalLanguage.textContent = country.language;
			modalPopulation.textContent = country.population;
			modalArea.textContent = country.area;
			modalCurrency.textContent = country.currency;
			cardsDiv.append(card);
			
			modalButton.addEventListener("click", () => {
				modal = document.querySelector(modalButton.dataset.modalTarget);
				openModal(modal);
			})
			
			return {continent: country.continent , name: country.name, element: card}
		})
	})
