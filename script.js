const heroButton = document.getElementById("hero-button");

heroButton.addEventListener("click", heroButtonClick)


function heroButtonClick() {
	document.getElementById("search-div").scrollIntoView({behavior: "smooth"});
}

/* Maybe try to save all your card data to .json file, if it's easier to make search bar that way. */