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