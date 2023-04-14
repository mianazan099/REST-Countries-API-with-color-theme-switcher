(async function () {
  const textInput = document.querySelector(".textInput input");
  const selectSpan = document.querySelector(".selectBtn span");
  const selectOptions = document.querySelectorAll(".options .option button");

  let data;
  try {
    let response = await fetch(
      "https://restcountries.com/v3.1/all?fields=flags,name,population,region,capital,cca2"
    );
    data = await response.json();
  } catch (e) {
    console.log("There was an error while fetching data from the API: ", e);
  }
  createCards(data);

  textInput.value = "";

  textInput.addEventListener("input", (e) => {
    selectSpan.textContent = "Filter by Region";
    const filterData = data.filter((obj) => {
      const lCName = obj.name.common.toLowerCase();
      const lCValue = e.target.value.toLowerCase();
      return lCName.includes(lCValue);
    });
    createCards(filterData);
  });

  selectOptions.forEach((option) => {
    option.addEventListener("click", (e) => {
      selectSpan.textContent = e.target.textContent;
      textInput.value = "";
      const filterData = data.filter((obj) => {
        return obj.region === e.target.textContent;
      });
      createCards(filterData);
    });
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
        name.href = `./details.html?code=${cca2}`;
        liArr[0].textContent = population.toLocaleString();
        liArr[1].textContent = region;
        liArr[2].textContent = capital;
        cardContainer.appendChild(el);
      }
    );
  }
})();
