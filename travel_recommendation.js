// Function to fetch data from a JSON file
function fetchData() {
  fetch("travel_recommendation_api.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Invalid response");
      }
      return response.json();
    })
    .then((data) => {
      // Call handleSearch with the fetched data
      console.log(data);
      handleSearch(data);
    })
    .catch((error) => {
      console.error("Server error, please try again later:", error);
    });
}

// Function to handle search
function handleSearch(data) {
  // Get the search input value and convert it to lowercase
  const searchInput = document
    .getElementById("searchInput")
    .value.toLowerCase();

  // Filter data using keyword
  const filteredResults = [];
  switch (true) {
    case /beach/.test(searchInput):
      data.beaches.forEach((beach) => {
        filteredResults.push(beach);
      });
      break;
    case /temple/.test(searchInput):
      data.temples.forEach((temple) => {
        filteredResults.push(temple);
      });
      break;
    case /country/.test(searchInput) || /countries/.test(searchInput):
      data.countries.forEach((country) => {
        country.cities.forEach((city) => {
          filteredResults.push(city);
        });
      });
      break;
    default:
      alert("Invalid search query. Please try again.");
      return;
  }

  // Display search results as cards
  const resultContainer = document.getElementById("result-container");
  resultContainer.innerHTML = ""; // Clear previous search results
  if (filteredResults.length > 0) {
    filteredResults.forEach((item) => {
      const html = `
        <div class="result-card">
            <img src="${item.imageUrl}" alt="${item.name}"/>
            <div class="card-info">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
            </div>
        </div>`;
      resultContainer.innerHTML += html;
    });
  } else {
    alert("No results found");
  }
}

function clearResult() {
  const resultContainer = document.getElementById("result-container");
  resultContainer.innerHTML = ""; // Clear previous search results
}

// Event listeners
document.getElementById("searchButton").addEventListener("click", fetchData);
document.getElementById("clearButton").addEventListener("click", clearResult);
