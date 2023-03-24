import './css/styles.css';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;
const searchbox = document.querySelector('.searchbox > input');
searchbox.addEventListener(
  'input',
  debounce(() => {
    const input = searchbox.value;
    fetchCountries(input).then(showProfile);
  }, DEBOUNCE_DELAY)
);

//   console.log(input);
// });

function showProfile(userdata) {
  console.log(userdata);
}

function fetchCountries(input) {
  return fetch(`https://restcountries.com/v3.1/name/${input}`)
    .then(response => response.json())
    .then(userdata => console.log(userdata));
}
//    sponse.status);
//   }
//   return response.json();
// })
// .then(data => {
//   // Data handling
// })
// .catch(error => {
//   // Error handling
// });}

//   name.official - полное имя страны
// capital - столица
// population - население
// flags.svg - ссылка на изображение флага
// languages - массив языков
