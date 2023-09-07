const gamesListPrincipal = document.querySelector('#games-list-principal');
const gamesListRelationed = document.querySelector('#games-relationed');

//Função que adiciona um elemento de loading antes de exibir os dados da API
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
	div.dataset.gamename = game.slug;//obtém o nome do jogo
	div.className = 'item';
	div.innerHTML =
		`
			<!DOCTYPE html>
			<html lang="pt-Br">
				<head>
					<link rel="stylesheet" href="./css/style.css">
					<style>
						.card-game {
							box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
							margin: auto;
							text-align: center;
							font-family: arial;
						}
					</style>
				</head>
				<body>
					<div class="card-game">
						<div class="card-image">
							<img src="${game.background_image}" />
						</div>
						<div class="card-content">
							<p><h5>${game.name}</h5> (${game.released})</p>
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
	if(e.key === "Enter") {
		e.preventDefault();
		initGames(e.target.value);
	}
});