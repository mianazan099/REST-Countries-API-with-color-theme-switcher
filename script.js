(async function () {
  const response = await fetch(
    "https://restcountries.com/v3.1/all?fields=flags,name,population,region,capital,cca2"
  );
  const data = await response.json();
  createCards(data);
  //   const selectOptions = document.querySelectorAll(
  //     ".form .selectInput .options .option"
  //   );
  //   console.log(selectOptions);
  //   // const selectInput = document.querySelector(".form .selectInput");
  //   const textInput = document.querySelector(".form .textInput");
  //   textInput.addEventListener("input", (e) => {
  //     const filterData = data.filter((obj) => {
  //       return obj.name.common
  //         .toLowerCase()
  //         .includes(e.target.value.toLowerCase());
  //     });
  //     createCards(filterData);
  //   });
  //   selectOptions.forEach((option) => {
  //     option.addEventListener("click", () => {
  //       console.log("i");
  //       //   textInput.value = "";
  //       //   const filterData = data.filter((obj) => {
  //       //     return obj.region === e.target.value;
  //       //   });
  //       //   createCards(filterData);
  //     });
  //   });
  function createCards(data) {
    const cardContainer = document.querySelector(".card-container");
    const template = document.querySelector("template");

    cardContainer.innerHTML = "";
    data.forEach(
      ({
        flags: { png, alt },
        name: { common },
        population,
        region,
        capital: [capital],
        cca2,
      }) => {
        const clone = template.cloneNode(true);
        let el = clone.content.firstElementChild;
        let img = el.querySelector("img");
        let name = el.querySelector("h2 a");
        let liArr = el.querySelectorAll("span");
        img.src = png;
        img.alt = alt;
        name.textContent = common;
        name.href = `/details.html?code=${cca2}`;
        liArr[0].textContent = population.toLocaleString();
        liArr[1].textContent = region;
        liArr[2].textContent = capital;
        cardContainer.appendChild(el);
      }
    );
  }
})();

// OLD CODE

// // Theme

// const themeSwitch = document.querySelector("header .theme-switch");
// const body = document.body;

// if (localStorage.getItem("theme") === null) {
//   localStorage.setItem("theme", "dark");
// }

// const theme = localStorage.getItem("theme");
// body.classList.add(theme);

// switch (theme) {
//   case "dark":
//     themeSwitch.innerHTML = '<i class="fa-solid fa-sun"></i>Light Mode';
//     break;
//   case "light":
//     themeSwitch.innerHTML = '<i class="fa-solid fa-moon"></i>Dark Mode';
//     break;
// }

// themeSwitch.addEventListener("click", () => {
//   if (body.classList.contains("dark")) {
//     localStorage.setItem("theme", "light");
//     body.classList.replace("dark", "light");
//     themeSwitch.innerHTML = '<i class="fa-solid fa-moon"></i>Dark Mode';
//   } else {
//     localStorage.setItem("theme", "dark");
//     body.classList.replace("light", "dark");
//     themeSwitch.innerHTML = '<i class="fa-solid fa-sun"></i>Light Mode';
//   }
// });

// // Card
