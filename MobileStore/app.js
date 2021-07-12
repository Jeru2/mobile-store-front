var data;
fetch("mobileData.json")
	.then((response) => response.json())
	.then((json) => display(json));

function display(json) {
	data = json;
	var htmlGenCards = json.map(function (o) {
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

	var lookup = {};
	var items = json;
	var result = [];

	for (var item, i = 0; (item = items[i++]); ) {
		var name = item.manufacturer;
		if (!(name in lookup)) {
			lookup[name] = 1;
			result.push(name);
		}
	}
	var htmlGenManufacturer = ``;
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

	var lookup = {};
	var items = json;
	var result = [];

	for (var item, i = 0; (item = items[i++]); ) {
		var name = item.storage;
		if (!(name in lookup)) {
			lookup[name] = 1;
			result.push(name);
		}
	}
	var htmlGenStorage = ``;
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

	var lookup = {};
	var items = json;
	var result = [];

	for (var item, i = 0; (item = items[i++]); ) {
		var name = item.os;
		if (!(name in lookup)) {
			lookup[name] = 1;
			result.push(name);
		}
	}
	var htmlGenOs = ``;
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
	$(".osStack").append(htmlGenOs);

	filterCheck();
	displayModal();
}
function filterCheck() {
	var $filterCheckboxes = $('input[type="checkbox"]');

	$filterCheckboxes.on("change", function () {
		var selectedFilters = {};

		$filterCheckboxes.filter(":checked").each(function () {
			if (!selectedFilters.hasOwnProperty(this.name)) {
				selectedFilters[this.name] = [];
			}
			selectedFilters[this.name].push(this.value);
		});
		console.log("Filtered = ");
		var $filteredResults = $(".card");
		$.each(selectedFilters, function (name, filterValues) {
			$filteredResults = $filteredResults.filter(function () {
				var matched = false,
					currentFilterValues = $(this).data("category").split(" ");
				$.each(currentFilterValues, function (_, currentFilterValue) {
					if ($.inArray(currentFilterValue, filterValues) != -1) {
						matched = true;
						return false;
					}
				});
				return matched;
			});
		});

		$(".card")
			.css("opacity", "0.2")
			.filter($filteredResults)
			.css("opacity", "1.0");
	});
}

document
	.getElementById("clearFilter")
	.addEventListener("click", clearFilters, false);

function clearFilters() {
	var checkboxes = document.getElementsByClassName("checkboxGrp");
	for (var i = 0; i < checkboxes.length; i++) {
		checkboxes[i].checked = false;
	}

	$(".card").css("opacity", "1.0");
}
function displayModal() {
	var modal = document.getElementById("detailsModal");
	var cards = document.getElementsByClassName("card");
	var modalImg = document.getElementById("detailedImg");
	var captionText = document.getElementById("caption");

	for (var i = 0; i < cards.length; i++) {
		var currentCard = cards[i];
		currentCard.onclick = function () {
			modal.style.display = "block";
			modalImg.src = this.getAttribute("data-enlargedImage");
			captionText.innerHTML = this.getAttribute("data-detailsText");
		};
	}
	var span = document.getElementsByClassName("close")[0];
	span.onclick = function () {
		modal.style.display = "none";
	};
}
