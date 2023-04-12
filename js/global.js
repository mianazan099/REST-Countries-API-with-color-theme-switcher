const themeSwitch = document.querySelector("header .theme-switch");
const body = document.body;

const darkColor = window.matchMedia("(prefers-color-scheme: dark)").matches;
if (localStorage.getItem("theme") === null)
  localStorage.setItem("theme", darkColor ? "dark" : "light");

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
