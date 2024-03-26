const changeMainTitleColor = () => mainTitle.style.color = '#2BBBAD';
const changeReleasedTitleColor = () => releasedTitle.style.color = '#2BBBAD';

const handleErrorImageNull = (image) => {
  image.onerror = '';
  image.src = './img/noimage.png';
  return true;
}

const checkValueIfNullOrZero = value =>  value === 0 ? 'Nenhuma' : value ?? 'Nenhuma';

const addZeroInDate = number => number <= 9 ? number = `0${number}` : number;

const formatDate = (date) => date ? new Date(date).toLocaleDateString('pt-BR') : new Date().toLocaleDateString('pt-BR');

const limitText = (text) => {
  const limit = 80;
  return text.length >= limit ? text.substring(0, 70) + ' ...' : text;
}

const checkIfExistContent = () => {
  const getDivContent = gamesListRelationed.innerHTML = '';
  if (!getDivContent) {
    changeMainTitleColor();
    releasedTitle.style.color = '';
  }
}