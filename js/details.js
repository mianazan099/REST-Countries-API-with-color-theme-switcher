const cCode = window.location.search.substring(6);
const url = `https://restcountries.com/v3.1/alpha/${cCode}?fields=name,population,region,subregion,capital,tld,currencies,languages,borders`;
console.log(url);
