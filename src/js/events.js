const gamesListPrincipal = document.querySelector('#games-list-principal');
const gamesListRelationed = document.querySelector('#games-relationed');
const mainTitle = document.getElementById("main-title");
const releasedTitle = document.getElementById("released-title");
const actionGenre = document.getElementById("action-genre");
const strategyGenre = document.getElementById("strategy-genre");
const rpgGenre = document.getElementById("rpg-genre");

//Theme
const getTheme = () => localStorage.getItem('theme') || 'light';
const saveTheme = (theme) => localStorage.setItem('theme', theme);
const applyTheme = (theme) => document.documentElement.dataset.theme = theme;
const rotateTheme = (theme) => theme === 'light' ? 'dark' : 'light';

const themeDisplay = document.getElementById('theme');
const themeToggler = document.getElementById('theme-toggle');

let theme = getTheme();
applyTheme(theme);
themeDisplay.innerText = theme;

themeToggler.onclick = () => {
	const newTheme = rotateTheme(theme);
	applyTheme(newTheme);
	themeDisplay.innerText = newTheme;
	saveTheme(newTheme);

	theme = newTheme;
};

const setGameLoad = (gameEl) => {
	gameEl.innerHTML =
		`
			<div class="preloader-wrapper active" style="position: absolute; left: 50%; margin-top: 30px">
				<div class="spinner-layer spinner-blue-only">
					<div class="circle-clipper left">
						<div class="circle"></div>
					</div>
					<div class="gap-patch">
						<div class="circle"></div>
					</div>
					<div class="circle-clipper right">
						<div class="circle"></div>
					</div>
				</div>
			</div>
	`;
};

//Set data the games
const setGameHTML = (game) => {
	let div = document.createElement('div');
	div.dataset.gamename = game.name;
	div.className = 'item';
	div.innerHTML =
		`
			<!DOCTYPE html>
			<html lang="pt-Br">
				<head>
					<link rel="stylesheet" href="./css/style.css">
				</head>
				<body>
					<div class="card-game" onclick="changeReleasedTitleColor()">
						<div class="card-image">
							<img
								src="${game.background_image}"
								title="${game.name}"
								alt="No image available"
								onerror="handleErrorImageNull(this)"
							/>
						</div>
						<div class="card-content">
							<h6>${limitText(game.name)}</h6>
							<p><i class="tiny material-icons">new_releases</i> Lançamento: ${formatDate(game.released)}</p>
							<p><i class="tiny material-icons">update</i> Atualizado em: ${formatDate(game.updated)}</p>
							<p><i class="tiny material-icons">star</i> Classificação: ${game.rating === 0 ? 'Nenhuma' : game.rating}</p>
							<p><i class="tiny material-icons">tag_faces</i> Avaliação: ${game.metacritic === null ? 'Nenhuma' : game.metacritic}</p>
						</div>
					</div>
				</body>
			</html>
    `;
	return div;
};

//Load games in an div
const initGames = async (gamename) => {
	setGameLoad(gamesListPrincipal);

	gamesListRelationed.innerHTML = '';
	const games = await getGamesByName(gamename);

	gamesListPrincipal.innerHTML = '';

	games.results.forEach(game => {
		const divGame = setGameHTML(game);

		//Event to show relationed games
		divGame.addEventListener('click', async e => {
			setGameLoad(gamesListRelationed);

			//Get the element that triggered the event
			const gameTag = e.currentTarget;

			//Retrieve game name clicked
			const gamename = gameTag.dataset.gamename;
			const gamesRelationed = await getRelatedGamesByName(gamename);

			//Remove div content if exist
			gamesListRelationed.innerHTML = '';

			//Create an HTML to each relationed game
			gamesRelationed.results.forEach(game => {
				const divGameRelationed = setGameHTML(game);
				gamesListRelationed.append(divGameRelationed);
			});
		});
		//Add games in an div
		gamesListPrincipal.append(divGame);
	});
};

actionGenre.addEventListener('click', async (actionGenre) => {
	checkIfExistContent();
	setGameLoad(gamesListPrincipal);

	const genre = await getActionGenre(actionGenre);

	gamesListPrincipal.innerHTML = '';

	genre.results.forEach(game => {
		const divGenresAction = setGameHTML(game);
		gamesListPrincipal.append(divGenresAction);

		divGenresAction.addEventListener('click', async e => {
			setGameLoad(gamesListRelationed);

			const gameTag = e.currentTarget;
			const gamename = gameTag.dataset.gamename;
			const gamesRelationed = await getRelatedGamesByName(gamename);

			gamesListRelationed.innerHTML = '';

			gamesRelationed.results.forEach(game => {
				const divGameRelationed = setGameHTML(game);
				gamesListRelationed.append(divGameRelationed);
			});
		});
		gamesListPrincipal.append(divGenresAction);
	});
});

strategyGenre.addEventListener('click', async (strategyGenre) => {
	checkIfExistContent();
	setGameLoad(gamesListPrincipal);

	const genre = await getStrategyGenre(strategyGenre);

	gamesListPrincipal.innerHTML = '';

	genre.results.forEach(game => {
		const divStrategyGenre = setGameHTML(game);
		gamesListPrincipal.append(divStrategyGenre);

		divStrategyGenre.addEventListener('click', async e => {
			setGameLoad(gamesListRelationed);

			const gameTag = e.currentTarget;
			const gamename = gameTag.dataset.gamename;
			const gamesRelationed = await getRelatedGamesByName(gamename);

			gamesListRelationed.innerHTML = '';

			gamesRelationed.results.forEach(game => {
				const divGameRelationed = setGameHTML(game);
				gamesListRelationed.append(divGameRelationed);
			});
		});
		gamesListPrincipal.append(divStrategyGenre);
	});
});

rpgGenre.addEventListener('click', async (rpgGenre) => {
	checkIfExistContent();
	setGameLoad(gamesListPrincipal);

	const genre = await getRpgGenre(rpgGenre);

	gamesListPrincipal.innerHTML = '';

	genre.results.forEach(game => {
		const divRpgGenre = setGameHTML(game);
		gamesListPrincipal.append(divRpgGenre);

		divRpgGenre.addEventListener('click', async e => {
			setGameLoad(gamesListRelationed);

			const gameTag = e.currentTarget;
			const gamename = gameTag.dataset.gamename;
			const gamesRelationed = await getRelatedGamesByName(gamename);

			gamesListRelationed.innerHTML = '';

			gamesRelationed.results.forEach(game => {
				const divGameRelationed = setGameHTML(game);
				gamesListRelationed.append(divGameRelationed);
			});
		});
		gamesListPrincipal.append(divRpgGenre);
	});
});

document.querySelector('[type=text]').addEventListener('keypress', (e) => {
	if (e.key === "Enter") {
		e.preventDefault();
		checkIfExistContent();
		initGames(e.target.value);
	}
});