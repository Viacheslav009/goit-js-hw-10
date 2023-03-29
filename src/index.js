import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';

import { fetchCountries } from './js/fetchCountries';

const DEBOUNCE_DELAY = 300;
const countryInfo = document.querySelector('.country-info');
const countryList = document.querySelector('.country-info');
const searchbox = document.querySelector('#search-box');

searchbox.addEventListener('input', debounce(inputCountry, DEBOUNCE_DELAY));

function inputCountry() {
  // e.preventDefault();
  // console.log(e.target.value.trim());
  const inputTEXT = searchbox.value.trim();

  if (!inputTEXT) {
    countryInfo.innerHTML = '';
    countryList.innerHTML = '';
    return;
  }

  fetchCountries(inputTEXT)
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
      countryInfo.innerHTML = '';
      countryList.innerHTML = '';
      Notify.failure('Oops, there is no country with that name');
      return err;
    });
}
const renderHTML = data => {
  if (data.length === 1) {
    const markup = showCountryInfo(data);
    console.log(markup.join());
    countryInfo.innerHTML = markup.join('');

    countryList.innerHTML = '';
    countryInfo.insertAdjacentHTML('beforeend', markup.join());
  } else {
    const listMarkup = showCountryList(data);
    console.log(listMarkup.join());
    countryList.innerHTML = listMarkup.join('');

    countryInfo.innerHTML = '';
    countryList.insertAdjacentHTML('beforeend', listMarkup.join(''));
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
      `<li class="country-list__item"><img src="${flags.svg}"  alt="country flag" width="30">
     <span>${name.official}</span>
       </li>`
  );
};

// const url = 'https://restcountries.com/v3.1/name/';
// const filter = new URLSearchParams({
//   fields: 'name,capital,population,flags,languages',
// });
// const fetchCountries = input => {
//   return fetch(`${url}${input}?${filter}`).then(response => {
//     if (!response.ok) {
//       throw new Error(response.status);
//     }

//     return response.json();
//   });
