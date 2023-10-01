//Get all games
const getGamesByName = async (name) => {
	const url = `https://api.rawg.io/api/games?key=${chave}&search=${name}&page_size=10`;
	return fetch(url)
		.then((response) => {
			if (!response.ok) {
				throw new Error('Requisição não sucedida.');
			}
			return response.json();
		}).catch((error) => {
			console.error('Houve um problema com a operação de busca:', error);
			throw error;
		});
};

//Get related games
const getRelatedGamesByName = async (name) => {
	const url = `https://api.rawg.io/api/games?key=${chave}&search=${name}/suggested&page_size=10`;
	return fetch(url)
		.then((response) => {
			if (!response.ok) {
				throw new Error('Requisição não sucedida');
			}
			return response.json();
		}).catch((error) => {
			console.error('Houve um problema com a operação de busca:', error);
		});
};

//Get action genre
const getActionGenre = async () => {
	const url = `https://api.rawg.io/api/games?genres=racing&key=${chave}&page_size=10`;
	return fetch(url)
		.then(async (response) => {
			if (!response.ok) {
				throw new Error('Requisição não sucedida.');
			}
			const body = await response.json();
			return body;
		}).catch((error) => {
			console.error('Houve um problema com a operação de busca:', error);
			throw error;
		})
};

//Get strategy genre
const getStrategyGenre = async () => {
	const url = `https://api.rawg.io/api/games?genres=strategy&key=${chave}&page_size=10`;
	return fetch(url)
		.then((response) => {
			if (!response.ok) {
				throw new Error('Requisição não sucedida');
			}
			return response.json();
		}).catch((error) => {
			console.error('Houve um problema com a operação de busca:', error);
		});
};

//Get rpg genre
const getRpgGenre = async () => {
	const url = `https://api.rawg.io/api/games?genres=role-playing-games-rpg&key=${chave}&page_size=10`;
	return fetch(url)
		.then((response) => {
			if (!response.ok) {
				throw new Error('Requisição não sucedida');
			}
			return response.json();
		}).catch((error) => {
			console.error('Houve um problema com a operação de busca:', error);
		});
};