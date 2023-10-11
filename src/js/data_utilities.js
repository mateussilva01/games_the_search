const changeMainTitleColor = () => mainTitle.style.color = "#2BBBAD";
const changeReleasedTitleColor = () => releasedTitle.style.color = "#2BBBAD";

const handleErrorImageNull = (image) => {
  image.onerror = '';
  image.src = './img/noimage.png';
  return true;
}

const addZeroInDate = (number) => {
  if (number <= 9)
    return '0' + number;
  else
    return number;
}

const formatDate = (element) => {
  let data = new Date(element);
  let day = (data.getDate().toString());
  let month = ((data.getMonth()+1).toString());
  let year = (data.getFullYear());
  let getFormatDate = (addZeroInDate(day) + "/" + (addZeroInDate(month)) + "/" + year);
  let showFormatDate = getFormatDate.slice(0, 10);

  if (!showFormatDate)
    return '';
  return showFormatDate;
}

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