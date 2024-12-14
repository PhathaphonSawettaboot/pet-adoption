const template = document.querySelector("#pet-card-template")
const wrapper = document.createDocumentFragment()


async function start() {
  const weatherPromise = await fetch("https://api.weather.gov/gridpoints/STO/29,164/forecast")
  weatherData = await weatherPromise.json()
  const ourTemperature = weatherData.properties.periods[0].temperature
  document.querySelector("#temperature-output").textContent = ourTemperature
}

start()

async function petsArea() {
  const petsPromise = await fetch("https://learnwebcode.github.io/bootcamp-pet-data/pets.json")
  petsData = await petsPromise.json()
  petsData.forEach((pet) => {
    const clone = template.content.cloneNode(true)
    clone.querySelector(".pet-card").dataset.species = pet.species
    clone.querySelector("h3").textContent = pet.name
    clone.querySelector(".pet-description").textContent = pet.description
    clone.querySelector(".pet-age").textContent = createAgeText(pet.birthYear)

    if (!pet.photo) pet.photo = "images/fallback.jpg"
    clone.querySelector(".pet-card-photo img").src = pet.photo
    clone.querySelector(".pet-card-photo img").alt = `A ${pet.species} named ${pet.name}.`
    wrapper.appendChild(clone)
  });
  document.querySelector(".list-of-pets").appendChild(wrapper)
}

petsArea()

function createAgeText(birthYear) {
  const currentYear = new Date().getUTCFullYear()
  const age = currentYear - birthYear

  if (age == 1) return "1 year old"
  if (age == 0) return "Less than a year old"
  return `${age} years old` //if (age >= 1)
}

// Pet Filter Button Code
const allButtons = document.querySelectorAll(".pet-filter button")

allButtons.forEach((btn) => {
  btn.addEventListener("click", handleButtonClick)
});

function handleButtonClick(e) {
  // Remove active class from any and all buttons
  allButtons.forEach(btn => {
    btn.classList.remove("active")
  });

  // Add active class to the specific button that just got clicked
  e.target.classList.add("active")

  // Actually filter the pets down below
  const currentFilter = e.target.dataset.petfilter
  document.querySelectorAll(".pet-card").forEach(el => {
    if (currentFilter == el.dataset.species || currentFilter == "all") {
      el.style.display = "grid"
    } else {
      el.style.display = "none"
    }
  })
}