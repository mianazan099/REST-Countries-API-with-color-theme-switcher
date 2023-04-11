// Theme

const themeSwitch = document.querySelector("header .theme-switch");
const body = document.body;

if (localStorage.getItem("theme") === null) {
  localStorage.setItem("theme", "dark");
}

const theme = localStorage.getItem("theme");
body.classList.add(theme);

switch (theme) {
  case "dark":
    themeSwitch.innerHTML = '<i class="fa-solid fa-sun"></i>Light Mode';
    break;
  case "light":
    themeSwitch.innerHTML = '<i class="fa-solid fa-moon"></i>Dark Mode';
    break;
}

themeSwitch.addEventListener("click", () => {
  if (body.classList.contains("dark")) {
    localStorage.setItem("theme", "light");
    body.classList.replace("dark", "light");
    themeSwitch.innerHTML = '<i class="fa-solid fa-moon"></i>Dark Mode';
  } else {
    localStorage.setItem("theme", "dark");
    body.classList.replace("light", "dark");
    themeSwitch.innerHTML = '<i class="fa-solid fa-sun"></i>Light Mode';
  }
});

// Card

(async function () {
  const response = await fetch(
    "https://restcountries.com/v3.1/all?fields=flags,name,population,region,capital"
  );
  const data = await response.json();
  createCards(data);

  const selectOptions = document.querySelectorAll(
    ".form .selectInput .options .option"
  );
  console.log(selectOptions);
  // const selectInput = document.querySelector(".form .selectInput");
  const textInput = document.querySelector(".form .textInput");

  textInput.addEventListener("input", (e) => {
    const filterData = data.filter((obj) => {
      return obj.name.common
        .toLowerCase()
        .includes(e.target.value.toLowerCase());
    });
    createCards(filterData);
  });

  selectOptions.forEach((option) => {
    option.addEventListener("click", () => {
      console.log("i");

      //   textInput.value = "";
      //   const filterData = data.filter((obj) => {
      //     return obj.region === e.target.value;
      //   });
      //   createCards(filterData);
    });
  });
})();

function createCards(data) {
  const cardContainer = document.querySelector(".card-container");
  cardContainer.innerHTML = "";
  data.forEach(
    ({
      flags: { png, alt },
      name: { common },
      population,
      region,
      capital: [capital],
    }) => {
      const card = createElement(`
        <div class="card">
          <div class="img">
            <img src="${png}" alt="${alt}" />
          </div>
          <div class="info">
            <h2>${common}</h2>
            <ul>
              <li>Population: <span>${population.toLocaleString()}</span></li>
              <li>Region: <span>${region}</span></li>
              <li>Capital: <span>${capital}</span></li>
            </ul>
          </div>
        </div>`);
      cardContainer.appendChild(card);
    }
  );
}

function createElement(html) {
  const template = document.createElement("template");
  template.innerHTML = html.trim();
  return template.content.firstElementChild;
}
