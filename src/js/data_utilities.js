const handleErrorImageNull = (image) => {
  image.onerror = '';
  image.src = './img/noimage.png';
  return true;
}

const formatDate = (elemento) => {
  if(!elemento)
    return '';
  return elemento.slice(0, 10);
}

const limitText = (texto) => {
  const limite = 80;
  return texto.length >= limite ? texto = texto.substring(0, 70) + ' ...' : texto;
}