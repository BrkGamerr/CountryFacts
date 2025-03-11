// Navigation Link Variables
const europeNavigationLink = document.getElementById("europe");
const northAmericaNavigationLink = document.getElementById("northAmerica");
const asiaNavigationLink = document.getElementById("asia");
const southAmericaNavigationLink = document.getElementById("southAmerica");
const africaNavigationLink = document.getElementById("africa");
const oceaniaNavigationLink = document.getElementById("oceania");

// Button Variables
const randomButton = document.getElementById("randomButton");
const exploreButton = document.getElementById("exploreButton");
const scrollTopButton = document.getElementById("scrollTopButton");

// Search Variable
const searchInput = document.querySelector("[data-search-input]");
let searchInputValue = "";

// Card Variables
const cards = document.querySelector("[data-card]");
const cardTemplate = document.querySelector("[data-card-template]");

// Modal Variables
let modalIDs = [];
let clickedModal = {};
let randomModal = {};

// Overlay Variable
const overlay = document.getElementById("overlay");

// Fetching Variable
let countries = [];

// Navigation Link Function
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

// Button Functions
function randomButtonClick() {
	if (searchInputValue.length > 0) {
		searchInputValue = "";
		searchInput.value = "";
		countries.forEach(country => {
			country.element.classList.remove("hide");
		})
	}
	const randomIndex = Math.floor(Math.random() * modalIDs.length);
	const randomModalID = modalIDs[randomIndex];
	randomModal = document.querySelector(`#${randomModalID}`);
	openModal(randomModal);
}
function exploreButtonClick() {
	document.getElementById("search").scrollIntoView({behavior: "smooth"});
}
function scrollTopButtonClick() {
	document.getElementById("heroSection").scrollIntoView({behavior: "smooth"});
}

// Search Function
function filterByContinent(countries, key, value) {
	return countries.filter(country => country[key] === value);
}

// Modal Functions
function openModal(modal) {
	if (modal == null) return;
	modal.classList.add("modal--active");
	overlay.classList.add("overlay--active");
}
function closeModal(modal) {
	if (modal == null) return;
	modal.classList.remove("modal--active");
	overlay.classList.remove("overlay--active");
}

// Navigation Link Event Listeners
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

// Button Event Listeners
exploreButton.addEventListener("click", exploreButtonClick)
scrollTopButton.addEventListener("click", scrollTopButtonClick)
randomButton.addEventListener("click", randomButtonClick)

// Search Event Listener
searchInput.addEventListener("input", e => {
	searchInputValue = e.target.value.toLowerCase();

	countries.forEach(country => {
		const isVisible =
			country.name.toLowerCase().includes(searchInputValue);
		country.element.classList.toggle("hide", !isVisible);
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

// Overlay Event Listener
overlay.addEventListener("click", () => {
	try {
		closeModal(clickedModal);
	} catch(SyntaxError) {
		closeModal(randomModal);
	} finally {
		const modals = document.querySelectorAll("[data-modal]");
		modals.forEach(modal => {
			closeModal(modal);
		})
	}
})

// Fetching local data
fetch("data.json")
	.then(response => response.json())
	.then(data => {
		countries = data.map(country => {
			// Variables
			const card = cardTemplate.content.cloneNode(true).children[0];
			const cardButton = card.querySelector("[data-card-button]");
			const cardImage = card.querySelector("[data-card-image]");
			const cardName = card.querySelector("[data-card-name]");
			const modal = card.querySelector("[data-modal]");
			const modalTitle = card.querySelector("[data-modal-title]");
			const modalCapital = card.querySelector("[data-modal-capital]");
			const modalLanguage = card.querySelector("[data-modal-language]");
			const modalPopulation = card.querySelector("[data-modal-population]");
			const modalArea = card.querySelector("[data-modal-area]");
			const modalCurrency = card.querySelector("[data-modal-currency]");
			
			// Assigning
			cardButton.setAttribute("data-modal-target", `#${(country["name"]).replace(/\s/g, "")}`);
			cardButton.addEventListener("click", () => {
				clickedModal = document.querySelector(cardButton.dataset.modalTarget);
				openModal(clickedModal);
			})
			cardImage.src = `flags/${country["name"]}.png`;
			cardName.textContent = country["name"];
			
			modal.id = `${(country["name"]).replace(/\s/g, "")}`;
			modalIDs.push(modal.id);
			modal.classList.add(country["continent"]);
			modalTitle.textContent = country["name"];
			modalCapital.textContent = country["capital"];
			modalLanguage.textContent = country["language"];
			modalPopulation.textContent = country["population"];
			modalArea.textContent = country["area"];
			modalCurrency.textContent = country["currency"];
			
			cards.append(card);
			
			return {continent: country["continent"], name: country["name"], element: card};
		})
	})
