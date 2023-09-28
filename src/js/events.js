const gamesListPrincipal = document.querySelector('#games-list-principal');
const gamesListRelationed = document.querySelector('#games-relationed');
const mainTitle = document.getElementById("main-title");
const releasedTitle = document.getElementById("released-title");
const actionGenre = document.getElementById("action-genre");

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

//Seta as informações dos games
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
							<p>Lançamento: ${formatDate(game.released)}</p>
							<p>Atualizado em: ${formatDate(game.updated)}</p>
							<p>Classificação: ${game.rating === 0 ? 'Nenhuma' : game.rating}</p>
							<p>Avaliação: ${game.metacritic === null ? 'Nenhuma' : game.metacritic}</p>
						</div>
					</div>
				</body>
			</html>
    `;
	return div;
};

//Carrega os jogos em uma div
const initGames = async (gamename) => {
	setGameLoad(gamesListPrincipal);

	gamesListRelationed.innerHTML = '';
	const games = await getGamesByName(gamename);

	gamesListPrincipal.innerHTML = '';

	games.results.forEach(game => {
		const divGame = setGameHTML(game);

		//Exibe os jogos relacionados
		divGame.addEventListener('click', async e => {
			setGameLoad(gamesListRelationed);

			//Adicionamos um ouvinte do evento clique em cada elemento de jogo criado - escuta em qual elemento foi clicado
			const gameTag = e.currentTarget;

			//Recupera o nome do jogo que clicamos
			const gamename = gameTag.dataset.gamename;
			const gamesRelationed = await getRelatedGamesByName(gamename);

			//Remove o conteúdo da div que vai conter os novos jogos
			gamesListRelationed.innerHTML = '';

			//Função que percorre os resultados da API e cria um HTML de cada jogo relacionado
			gamesRelationed.results.forEach(game => {
				const divGameRelationed = setGameHTML(game);
				gamesListRelationed.append(divGameRelationed);
			});
		});

		//adicionamos os games(divGames) em gamesListPrincipal
		gamesListPrincipal.append(divGame);
	});
};

actionGenre.addEventListener('click', async (genre) => {
	changeMainTitleColor();
	setGameLoad(gamesListPrincipal);

	const gameTag = genre.currentTarget;
	const actionNameGenre = gameTag.dataset.gamename;
	const generos = await getGenres(actionNameGenre);

	gamesListPrincipal.innerHTML = '';

	clearTitleStyle();

	generos.results.forEach(game => {
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

document.querySelector('[type=text]').addEventListener('keypress', (e) => {
	if (e.key === "Enter") {
		e.preventDefault();
		changeMainTitleColor();
		releasedTitle.style.color = '';
		initGames(e.target.value);
	}
});