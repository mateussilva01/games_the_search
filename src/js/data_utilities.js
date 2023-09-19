const handleErrorImageNull = (image) => {
  image.onerror = '';
  image.src = './img/noimage.png';
  return true;
}

const formatDate = (element) => {
  let data = new Date(element);
  let dataFormatada = `${((data.getDate() )) + "/" + ((data.getMonth() + 1)) + "/" + data.getFullYear()}`;
  if(!dataFormatada)
    return '';
  return dataFormatada.slice(0, 10);
}

const limitText = (text) => {
  const limit = 80;
  return text.length >= limit ? text.substring(0, 70) + ' ...' : text;
}