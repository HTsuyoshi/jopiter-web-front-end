const WINDOW_MAX = 1000;

//////////// SCORE ////////////

function get_group_score(food_group) {
	const get_score = {
		'Ave': 2.0,
		'Bovina': 1.0,
		'Ovo': 2.0,
		'Peixe': 2.0,
		'Suina': 1.0,
		'Processada': 0.0,
		'CerealMilho': 1.0,
		'Tuberculo': 0.5,
		'Legumes': 1.0,
		'Folhosos': 1.0,
		'Leguminosa': 2.0,
		'PTS': 2.0,
		'Soja': 2.0,
		'MassaTorta': 0.5,
		'Ovos': 2.0,
		'Queijo': 1.0,
		'Doce': 0.0,
		'Fruta': 2.0
	}
	return get_score[food_group];
}

function get_preparation_score(food_preparation) {
	const get_score = {
		'AoMolhoGorduroso': 1.0,
		'Assado': 2.0,
		'Cozido': 2.0,
		'Frito': 0.0,
		'GrelhadoRefogado': 2.0,
		'AoMolhoLeve': 2.0,
		'UltraProcessado': 0.0,
		'NaoUltraProcessado': 2.0
	}
	return get_score[food_preparation];
}

//////////// SCORE ////////////

//////////// QUERY ////////////

async function fetch_food(food_name) {
	const url = "https://v2.backend.jopiter.app/api/v1/classifier?item=" + food_name;
	const res = await fetch(url)
		.then(res => res.json());
	return res;
}

// Get information about the meal

function query() {

	const cards = document.getElementsByClassName("card");
	const card_quant = cards.length;
	if (card_quant > 3 && window.innerWidth < 1400
	|| card_quant > 5) return;


	const query = document.getElementsByTagName("input");
	if(query[0].value == "") return;

	first_query_animation();

	const card_list = document.getElementById('result-section');
	var card_id = 0;

	for (let i=cards.length - 1; i>-1; i--) {
		if (cards[i].id > card_id)
			card_id = cards[i].id;
	}

	insert_card(card_list, parseInt(card_id) + 1);

	resize_card();

	card_animation();
}

//////////// QUERY ////////////

//////////// ANIMATION ////////////

// Set Cards visible (Mobile animation)

function set_card_visible() {
	const cards = document.getElementsByClassName('card');

	if (cards[0].style.visibility == 'visible') return;

	card_animation();
	for (let i=0; i<cards.length; i++) {
		cards[i].style.visibility = 'visible';
	}
}

async function insert_card(card_list, card_id) {

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

	const food_name = document.getElementById('search-input').value;

	content += "<div id='title'>" + food_name + "</div><img id='food-icon' src=" + icon_src + "><a id='icon-ref' href=" + icon_href + " title=" + icon_title + ">" + icon_text + "</a><ul>";

	const food_attr = await fetch_food(food_name);
	var group_score = 0, preparation_score = 0;

	switch (typeSelected.value) {
		case 'Proteina':
			group_score = get_group_score(food_attr['protein']['foodGroup']);
			preparation_score = get_preparation_score(food_attr['protein']['preparation']);
			break;
		case 'Vegetariano':
			group_score = get_group_score(food_attr['vegetarian']['foodGroup']);
			preparation_score = get_preparation_score(food_attr['vegetarian']['preparation']);
			break;
		case 'Guarnição':
			group_score = get_group_score(food_attr['garrison']['foodGroup']);
			preparation_score = get_preparation_score(food_attr['garrison']['preparation']);
			break;
		case 'Sobremesa':
			group_score = get_group_score(food_attr['dessert']['foodGroup']);
			preparation_score = get_preparation_score(food_attr['dessert']['preparation']);
			break;
	}

	content += "<li><div class='table'>Grupo da comida</div><progress id='nutricional' value='" + group_score + "' max='2'></progress></li>";
	content += "<li><div class='table'>Preparação</div><progress id='sensorial' value='" + preparation_score + "' max='2'></progress></li>";

	content += "</ul><center/><div/>";

	card_list.insertAdjacentHTML('afterbegin', content);
}

function resize_card() {
	const card_quant = document.getElementsByClassName("card").length;
	const new_size = 300/card_quant;
	for (let i=0; i<card_quant; i++) {
		if (document.getElementById(i))
			document.getElementById(i).style.width = new_size;
	}
}

// Remove card when click on "X" button

function close_card(card_id) {
	const card = document.getElementById(card_id);
	const parent = document.getElementById('result-section');
	parent.removeChild(card);
	card_animation();
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
