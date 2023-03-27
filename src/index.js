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
    });
};

searchbox.addEventListener('input', debounce(inputCountry, DEBOUNCE_DELAY));

const renderHTML = data => {
  if (data.length === 1) {
    const markup = countrys.map(data => showCountryInfo(data));
    countryInfo.innerHTML = markup.join('');
    countryList.innerHTML = '';
  } else {
    const listMarkup = countrys.map(data => countryListTemplate(data));
    countryList.innerHTML = listMarkup.join('');
    countryInfo.innerHTML = '';
  }
};

function showCountryInfo({ flags, name, capital, population, languages }) {
  return `<div class="searchbox">
   <img src="${flags.svg}"  alt="country flag" width="100">
      
      <div class="country">
      <h1 class ="name"> ${name.official}</h1>
      <p>Capital: <span>${capital}</span></p>
      <p class="country-info__languages"><span class="country-info__weight">Languages:</span> ${Object.values(
        languages
      )}</p>
      <p>population: <span>${population}</span></p>
      </div>
    </div>`;
}
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

// fetchCountries(input)
//   .then(countrys => {
//     if (countrys.length > 10) {
//       Notify.info('Too many matches found. Please enter a more specific name.');
//       countryInfo.innerHTML = '';
//       countryList.innerHTML = '';
//       return;
//     }

//     if (countrys.length <= 10) {
//       const listMarkup = countrys.map(country => countryListTemplate(country));
//       countryList.innerHTML = listMarkup.join('');
//       countryInfo.innerHTML = '';
//     }

//     if (countrys.length === 1) {
//       const markup = countrys.map(country => countryСardTeemplate(country));
//       countryInfo.innerHTML = markup.join('');
//       countryList.innerHTML = '';
//     }
//   })
//   .catch(error => {
//     Notify.failure('Oops, there is no country with that name');
//     countryInfo.innerHTML = '';
//     countryList.innerHTML = '';
//     return error;
//   });
