//Obtém todos os jogos
const getGamesByName = async (name) => {
	const url = `https://api.rawg.io/api/games?key=b7c57e7059524f31ac492a57977f8dc9&search=${name}`;
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

//Obtém os jogos relacionados
const getRelatedGamesByName = async (name) => {
	const url = `https://api.rawg.io/api/games?key=b7c57e7059524f31ac492a57977f8dc9&search=${name}/suggested`;
	return fetch(url)
		.then((response) => {
			if(!response.ok) {
				throw new Error('Requisição não sucedida');
			}
			return response.json();
		}).catch((error) => {
			console.error('Houve um problema com a operação de busca:', error)
		});
};