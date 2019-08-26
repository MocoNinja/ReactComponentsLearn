const performRequest = (howManyRows = 25) => {
  const rows = parseInt(howManyRows);
  const endpoint = `https://www.zaragoza.es/sede/servicio/monumento.json?rows=${rows}&fl=title,horario`;

  return fetch(endpoint)
    .then(response => response.json())
    .then(data => data.result);
};

export default performRequest;
