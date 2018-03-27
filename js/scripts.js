// Nav Menu Toggle
const navButton = document.querySelector("button[aria-expanded]");
function toggleNav({ target }) {
  const expanded = target.getAttribute("aria-expanded") === "true" || false;
  navButton.setAttribute("aria-expanded", !expanded);
}
navButton.addEventListener("click", toggleNav);

// Get Weather
async function loadWeather() {
  const result = await fetch("https://www.metaweather.com/api/location/2465512/");
  console.log(result);
}

loadWeather();
