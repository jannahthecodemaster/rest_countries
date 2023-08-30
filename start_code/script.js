
let globalOutput = null; // Global variable to store the fetched data


//first function
const fetchCountriesData = async () => { 
    const response = await fetch("https://restcountries.com/v3.1/all");
    const jsonData = await response.json();
    jsonData.splice(96, 1); //splicing Israel!!!!!!!
    console.log(jsonData);
    return jsonData;
 }

fetchCountriesData();

//setUp function
async function SetUp() {
  globalOutput = await fetchCountriesData();
  populateCountryList(globalOutput);
}

//call setUp function when the webpage loads
window.onload = SetUp;


// Create a function which uses this global variable to create a series of new HTML elements, populating each with information about each country (such as name and population), and adding them to the `<ul>` in your HTML. Call this function following your first function within the `SetUp()` function. Ensure that the original `<p>` element is removed ahead of populating your list
function populateCountryList() {
    const ul = document.querySelector('ul');
    ul.innerHTML = ''; // Clear the list
  
    globalOutput.forEach(country => {
      const li = document.createElement('li');
      li.textContent = `${country.name.common} - Population: ${country.population}`;
      ul.appendChild(li);
    });
  }

// Function to handle form submission
function handleFormSubmission(event) {
    event.preventDefault(); // Prevent form submission
    const inputElement = document.getElementById('filterInput');
    const inputValue = inputElement.value;
    filterAndUpdateList(inputValue);
}

// Function to filter and update the country list
function filterAndUpdateList(query) {
    const filteredCountries = globalOutput.filter(country => {
        const countryName = country.name.common.toLowerCase();
        return countryName.includes(query.toLowerCase());
    });

    const ul = document.querySelector("ul");
    ul.innerHTML = "";

    filteredCountries.forEach(country => {
        const li = document.createElement("li");
        li.textContent = `${country.name.common} - Population: ${country.population}`;
        ul.appendChild(li);
    });
}

// Attach the form submission handler
const form = document.getElementById('filterForm');
form.addEventListener('submit', handleFormSubmission);

