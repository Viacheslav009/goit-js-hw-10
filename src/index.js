import './css/styles.css';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;
const countryInfo = document.querySelector('.country-info');
const countryList = document.querySelector('.country-info');
const searchbox = document.querySelector('#search-box');

const inputCountry = e => {
  e.preventDefault();
  console.log(e.target.value.trim());
  const input = e.target.value.trim();
  fetchCountries(input).then(console.log);
  console.log(length);
  //   .then(data => {
  //   countryInfo.innerHTML = showCountryInfo(data);
  // });
};

searchbox.addEventListener('input', debounce(inputCountry, DEBOUNCE_DELAY));

function showCountryInfo(data) {
  return `<div class="searchbox">
   <img src="${data[0].flags.svg}"  alt="country flag" width="120" height="100">
      
      <div class="country">
      <h1 class ="name"> ${data[0].name.official}</h1>
      <p>Capital: <span>${data[0].capital}</span></p>
      <p>languages: <span>${data[0].languages}</span></p>
      <p>population: <span>${data[0].population}</span></p>
      </div>
    </div>`;
}

function fetchCountries(input) {
  const url = 'https://restcountries.com/v3.1/name/';
  const filter = '?fields=name,capital,population,flags,languages';
  return fetch(`${url}${input}${filter}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }

    return response.json();
  });
}

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
