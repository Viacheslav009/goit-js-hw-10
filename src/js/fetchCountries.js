export function fetchCountries(inputTEXT) {
  const url = 'https://restcountries.com/v3.1/name/';
  const filter = new URLSearchParams({
    fields: 'name,capital,population,flags,languages',
  });
  return fetch(`${url}${inputTEXT}?${filter}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }

    return response.json();
  });
}
