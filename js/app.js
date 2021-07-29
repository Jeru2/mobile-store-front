class MobileStore {
	constructor() {}
	initializeFetch() {
		fetch("/json/mobileData.json")
			.then((response) => response.json())
			.then((json) => this.displayElements(json));
	}

	displayElements(json) {
		let data = json;
		let htmlGenCards = json.map(function (o) {
			return `
            <div class = "card" 
			data-id="${o.name}" 
			data-category="${o.manufacturer} ${o.storage} ${o.os}" 
			data-enlargedImage="${o.enlargedImage}" 
			data-detailsText="${o.detailsText}">

            <img class = "img-overview" src="${o.image}" alt="${o.name}">
            <p class = "namedesc"> <strong> ${o.name} </strong> </p>
            <p class = "manufacturerdesc">Manufacturer: ${o.manufacturer} </p>
            <p class = "storagedesc">Storage: ${o.storage} </p>
            <p class = "cameradesc">Camera: ${o.camera} </p>
			<p class = "pricedesc">Rs. ${o.price} </p>
            </div>
        `;
		});
		$(".containerItems").append(htmlGenCards);

		let lookup = {};
		let items = json;
		let result = [];

		for (let item, i = 0; (item = items[i++]); ) {
			let name = item.manufacturer;
			if (!(name in lookup)) {
				lookup[name] = 1;
				result.push(name);
			}
		}
		let htmlGenManufacturer = ``;
		result.forEach((element) => {
			htmlGenManufacturer += `
			<div class="checkboxRow">
				<input
					type="checkbox"
					name="manufacturer"
					class="checkboxGrp"
					id="${element}"
					value="${element}"
				/>
				<label for="${element}">${element}</label>
			</div>
			`;
		});
		$(".manufacturerStack").append(htmlGenManufacturer);

		lookup = {};
		items = json;
		result = [];

		for (let item, i = 0; (item = items[i++]); ) {
			let name = item.storage;
			if (!(name in lookup)) {
				lookup[name] = 1;
				result.push(name);
			}
		}
		let htmlGenStorage = ``;
		result.forEach((element) => {
			htmlGenStorage += `
			<div class="checkboxRow">
				<input
					type="checkbox"
					name="storage"
					class="checkboxGrp"
					id="${element}"
					value="${element}"
				/>
				<label for="${element}">${element}</label>
			</div>
			`;
		});
		$(".storageStack").append(htmlGenStorage);

		lookup = {};
		items = json;
		result = [];

		for (let item, i = 0; (item = items[i++]); ) {
			let name = item.os;
			if (!(name in lookup)) {
				lookup[name] = 1;
				result.push(name);
			}
		}
		let htmlGenOs = ``;
		result.forEach((element) => {
			htmlGenOs += `
			<div class="checkboxRow">
				<input
					type="checkbox"
					name="os"
					class="checkboxGrp"
					id="${element}"
					value="${element}"
				/>
				<label for="${element}">${element}</label>
			</div>
			`;
		});

		document
			.getElementById("clearFilter")
			.addEventListener("click", this.clearFilters, false);
		$(".osStack").append(htmlGenOs);
		this.filterCheck(data);
		this.displayModal(data);
	}
	filterCheck(data) {
		let $filterCheckboxes = $('input[type="checkbox"]');

		$filterCheckboxes.on("change", function () {
			let selectedFilters = {};

			$filterCheckboxes.filter(":checked").each(function () {
				if (!selectedFilters.hasOwnProperty(this.name)) {
					selectedFilters[this.name] = [];
				}
				selectedFilters[this.name].push(this.value);
			});
			console.log("Filtered = ");
			let $filteredResults = $(".card");
			$.each(selectedFilters, function (name, filterValues) {
				$filteredResults = $filteredResults.filter(function () {
					let matched = false,
						currentFilterValues = $(this)
							.data("category")
							.split(" ");
					$.each(
						currentFilterValues,
						function (_, currentFilterValue) {
							if (
								$.inArray(currentFilterValue, filterValues) !=
								-1
							) {
								matched = true;
								return false;
							}
						}
					);
					return matched;
				});
			});

			$(".card")
				.css("opacity", "0.2")
				.filter($filteredResults)
				.css("opacity", "1.0");
		});
	}
	clearFilters() {
		let checkboxes = document.getElementsByClassName("checkboxGrp");
		for (let i = 0; i < checkboxes.length; i++) {
			checkboxes[i].checked = false;
		}

		$(".card").css("opacity", "1.0");
	}
	displayModal(data) {
		let modal = document.getElementById("detailsModal");
		let cards = document.getElementsByClassName("card");
		let modalImg = document.getElementById("detailedImg");
		let captionText = document.getElementById("caption");
		for (const card of cards) {
			card.onclick = function () {
				modal.style.display = "block";
				modalImg.src = this.getAttribute("data-enlargedImage");
				captionText.innerHTML = this.getAttribute("data-detailsText");
			};
		}
		let span = document.getElementsByClassName("close")[0];
		span.onclick = function () {
			modal.style.display = "none";
		};
		return;
	}
}
let caller = new MobileStore();
caller.initializeFetch();
