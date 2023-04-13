(async function () {
  const cCode = window.location.search.substring(6);
  const url = `https://restcountries.com/v3.1/alpha/${cCode}?fields=name,population,region,subregion,capital,tld,currencies,languages,borders,flags`;
  let data;
  try {
    let response = await fetch(url);
    data = await response.json();
  } catch (e) {
    console.log("There was an error while fetching data from the API: ", e);
  }
  const img = document.querySelector(".details img");
  const name = document.querySelector(".information h1");
  const liArr = document.querySelectorAll(".info ul li span");
  img.src = data.flags.svg;
  img.alt = data.flags.alt;
  name.textContent = data.name.common;
  let nativeNameKeys = Object.keys(data.name.nativeName);
  liArr[0].textContent =
    data.name.nativeName[nativeNameKeys[nativeNameKeys.length - 1]].common;
  liArr[1].textContent = data.population.toLocaleString();
  liArr[2].textContent = data.region;
  liArr[3].textContent = data.subregion;
  liArr[4].textContent = data.capital[0];
  liArr[5].textContent = data.tld[0];
  liArr[6].textContent = data.currencies[Object.keys(data.currencies)[0]].name;

  for (const key in data.languages) {
    if (Object.hasOwnProperty.call(data.languages, key)) {
      const value = data.languages[key];
      liArr[7].textContent += `${value}, `;
    }
  }
  liArr[7].textContent = liArr[7].textContent.slice(0, -2);

  const border = document.querySelector(".border");
  const BtnContainer = document.querySelector(".border div");
  if (data.borders.length === 0) {
    border.style.display = "none";
  }
  for (const key in data.borders) {
    if (Object.hasOwnProperty.call(data.borders, key)) {
      const value = data.borders[key];
      fetch(`https://restcountries.com/v3.1/alpha/${value}`)
        .then((res) => res.json())
        .then((data) => {
          const btn = document.createElement("button");
          const a = document.createElement("a");
          a.href = `/details.html?code=${value}`;
          a.textContent = data[0].name.common;
          btn.appendChild(a);
          BtnContainer.appendChild(btn);
          console.log(value);
        });
    }
  }
  // BtnContainer.appendChild;
  console.log(data);
})();
