const WINDOW_MAX = 1000;

//////////// QUERY ////////////

// Set Cards visible (Mobile animation)

function set_card_visible() {
	const cards = document.getElementsByClassName('card');

	if (cards[0].style.visibility == 'visible') return;

	card_animation();
	for (let i=0; i<cards.length; i++) {
		cards[i].style.visibility = 'visible';
	}
}

function insert_card(card_list, card_id) {

	var content = "<div class='card' id='" + card_id + "'><center><button id='close-icon' onclick='close_card(" + card_id + ")'><i class='fa-solid fa-x'></i></button>";

	var icon_src = "", icon_text = "", icon_href = "", icon_title = "";

	const typeSelected = document.getElementById("select-food");
	switch (typeSelected.value) {
		case 'Proteina':
			icon_src = "/img/meat.png";
			icon_text = "Meat icons created by Freepik - Flaticon";
			icon_href = "https://www.flaticon.com/free-icons/meat";
			icon_title = "meat icons";
			break;
		case 'Vegetariano':
			icon_src = "/img/vegan-food.png";
			icon_text = "Vegan icons created by justicon - Flaticon";
			icon_href = "https://www.flaticon.com/free-icons/vegan";
			icon_title = "vegan icons";
			break;
		case 'Guarnição':
			icon_src = "/img/salad.png";
			icon_text = "Salad icons created by Freepik - Flaticon";
			icon_href = "https://www.flaticon.com/free-icons/salad";
			icon_title = "salad icons";
			break;
		case 'Sobremesa':
			icon_src = "/img/dessert.png";
			icon_text = "Dessert icons created by Freepik - Flaticon";
			icon_href = "https://www.flaticon.com/free-icons/dessert";
			icon_title = "dessert icons";
			break;
	}
	
	var attr = [];
	for(let i=0; i<attr.length; i++) {
		attr[i] = Math.floor(Math.random() * 6);
	}

	content += "<div id='title'>" + typeSelected.value + "</div><img id='food-icon' src=" + icon_src + "><a id='icon-ref' href=" + icon_href + " title=" + icon_title + ">" + icon_text + "</a><ul>";

	content += "<li><div class='table'>Nutricional</div><progress id='nutricional' value='" + attr[0] + "' max='5'></progress></li>";
	content += "<li><div class='table'>Sensorial</div><progress id='sensorial' value='" + attr[1] + "' max='5'></progress></li>";
	content += "<li><div class='table'>Ambiental</div><progress id='ambiental' value='" + attr[2] + "' max='5'></progress></li>";

	content += "</ul><center/><div/>";

	card_list.insertAdjacentHTML('afterbegin', content);
}

function resize_card() {
	const card_quant = document.getElementsByClassName("card").length;
	const new_size = 300/card_quant;
	for (var i=0; i<card_quant; i++) {
		document.getElementById(i).style.width = new_size;
	}
}

// Get information about the meal

function query() {

	const card_quant = document.getElementsByClassName("card").length;
	if (card_quant > 3 && window.innerWidth < 1400
	|| card_quant > 5) return;


	const query = document.getElementsByTagName("input");
	if(query[0].value == "") return;

	first_query_animation();

	const card_list = document.getElementById('result-section');
	insert_card(card_list, card_quant);

	resize_card();

	card_animation();
}

//////////// QUERY ////////////

//////////// ANIMATION ////////////

// Remove card when click on "X" button

function close_card(card_id) {
	const card = document.getElementById(card_id);
	const parent = document.getElementById('result-section');
	parent.removeChild(card);
	resize_card();
}

// Card animation on query()

function card_animation() {
	anime({
		targets: '.card',
		scaleY: [{value: 1, duration: 0},
			{value: 1.1, duration: 50},
			{value: 1, duration: 200}],
		scaleX: [{value: 1, duration: 0},
			{value: 0.8, duration: 50},
			{value: 1, duration: 200}],
	});
}

// First animation before the first search

function first_query_animation() {
	if (window.innerWidth < WINDOW_MAX) return;
	anime({
		targets: '#search-section',
		width: '35vw',
	});
}

//////////// ANIMATION ////////////
