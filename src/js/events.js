const gamesListPrincipal = document.querySelector('#games-list-principal');
const gamesListRelationed = document.querySelector('#games-relationed');

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

//Função que seta as informações do game numa div
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
					<div class="card-game">
						<div class="card-image">
							<img src="${game.background_image}" />
						</div>
						<div class="card-content">
							<h6>${game.name}</h6>
							<p>Lançamento: ${game.released}</p>
							<p>Atualizado em: ${game.updated.slice(0, 10)}</p>
							<p>Classificação: ${game.rating}</p>
							<p>Avaliação: ${game.metacritic === null ? 'Nenhuma' : game.metacritic}</p>
						</div>
					</div>
				</body>
			</html>
    `;
	return div;
};

//Carrega os jogos em uma div
const initGames = async (gamename, gamegenre) => {
	setGameLoad(gamesListPrincipal);

	gamesListRelationed.innerHTML = '';
	let games = await getGamesByName(gamename);

	gamesListPrincipal.innerHTML = '';

	games.results.forEach(game => {
		let divGame = setGameHTML(game);

		//Exibe os jogos relacionados
		divGame.addEventListener('click', async e => {
			setGameLoad(gamesListRelationed);

			//Adicionamos um ouvinte do evento clique em cada elemento de jogo criado
			let gameTag = e.currentTarget;

			//Recupera o nome do jogo que clicamos
			let gamename = gameTag.dataset.gamename;

			let gamesRelationed = await getRelatedGamesByName(gamename);

			//Remove o conteúdo da div que vai conter os novos jogos
			gamesListRelationed.innerHTML = '';

			//Função que percorre os resultados da API e cria um HTML de cada jogo relacionado
			gamesRelationed.results.forEach(game => {
				let divGameRelationed = setGameHTML(game);
				gamesListRelationed.append(divGameRelationed);
			});
		});
		gamesListPrincipal.append(divGame);
	});
};

document.querySelector('[type=text]').addEventListener('keypress', (e) => {
	if (e.key === "Enter") {
		e.preventDefault();
		initGames(e.target.value);
	}
});

//Tema
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