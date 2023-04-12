(async function () {
  const response = await fetch(
    "https://restcountries.com/v3.1/all?fields=flags,name,population,region,capital,cca2"
  );
  const data = await response.json();
  createCards(data);
  const textInput = document.querySelector(".form .textInput");
  textInput.addEventListener("input", (e) => {
    const filterData = data.filter((obj) => {
      return obj.name.common
        .toLowerCase()
        .includes(e.target.value.toLowerCase());
    });
    createCards(filterData);
  });
  // Functions
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
