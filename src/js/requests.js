//Obtém todos os jogos
const getGamesByName = async (name) => {
	try {
		let result = await fetch(`https://api.rawg.io/api/games?key=${chave}&search=${name}`);
		result = await result.json();
		return result;
	} catch (error) {
		console.error(err);
	};
};

//Obtém os jogos relacionados
const getRelatedGamesByName = async (name) => {
	try {
		let result = await fetch(`https://api.rawg.io/api/games?key=${chave}&search=${name}/suggested`);
		result = await result.json();
		return result;
	} catch (error){
		console.log(err);
	};
};




