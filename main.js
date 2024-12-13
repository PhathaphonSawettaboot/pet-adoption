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
    clone.querySelector("h3").textContent = pet.name
    clone.querySelector(".pet-description").textContent = pet.description
    wrapper.appendChild(clone)
  });
  document.querySelector(".list-of-pets").appendChild(wrapper)
}

petsArea()