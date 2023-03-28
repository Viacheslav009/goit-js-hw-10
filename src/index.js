import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';

const DEBOUNCE_DELAY = 300;
const countryInfo = document.querySelector('.country-info');
const countryList = document.querySelector('.country-info');
const searchbox = document.querySelector('#search-box');

const inputCountry = e => {
  e.preventDefault();
  console.log(e.target.value.trim());
  const input = e.target.value.trim();

  if (input === '') {
    countryInfo.innerHTML = '';
    countryList.innerHTML = '';
    return;
  }
  fetchCountries(input)
    .then(data => {
      console.log(data);
      if (data.length > 10) {
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        return;
      }
      renderHTML(data);
    })
    .catch(err => {
      Notify.info('Oops, there is no country with that name');
      countryInfo.innerHTML = '';
      countryList.innerHTML = '';
      return err;
    });
};

const renderHTML = data => {
  if (data.length === 1) {
    const markup = showCountryInfo(data);
    console.log(markup.join());
    countryInfo.innerHTML = markup.join('');
    countryList.innerHTML = '';
  } else {
    const listMarkup = showCountryList(data);
    console.log(listMarkup.join());
    countryList.innerHTML = listMarkup.join('');
    countryInfo.innerHTML = '';
  }
};

const showCountryInfo = data => {
  return data.map(
    ({ flags, name, capital, population, languages }) =>
      `
   <img src="${flags.svg}"  alt="country flag" width="100">
      <h1 class ="name"> ${name.official}</h1>
      <p>Capital: <span>${capital}</span></p>
      <p class="country-info__languages"><span class="country-info__weight">Languages:</span> ${Object.values(
        languages
      )}</p>
      <p>population: <span>${population}</span></p>
      
    `
  );
};

const showCountryList = data => {
  return data.map(
    ({ flags, name }) =>
      `
   <li><img src="${flags.svg}"  alt="country flag" width="50">
      <h1 class ="name"> ${name.official}</h1></li>
      
    `
  );
};

searchbox.addEventListener('input', debounce(inputCountry, DEBOUNCE_DELAY));

const url = 'https://restcountries.com/v3.1/name/';
const filter = new URLSearchParams({
  fields: 'name,capital,population,flags,languages',
});
const fetchCountries = input => {
  return fetch(`${url}${input}?${filter}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }

    return response.json();
  });
};
