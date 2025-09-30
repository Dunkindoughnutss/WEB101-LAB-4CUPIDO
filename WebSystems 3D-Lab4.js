// adi man po didi an ako mga objects like mga location

const properties = [
  { location: "Manila", type: "Condo", price: 3000000, size: 50 },
  { location: "Cebu", type: "House", price: 5000000, size: 120 },
  { location: "Davao", type: "Lot", price: 1500000, size: 200 },
  { location: "Quezon City", type: "Condo", price: 4000000, size: 70 },
  { location: "Baguio", type: "House", price: 3500000, size: 90 }
];

const resultsDiv = document.getElementById("results");

// adi po an gin gagamit para mapakita ang text
function displayResult(title, data) {
  const section = document.createElement("div");
  section.innerHTML = `<h3>${title}</h3><pre>${JSON.stringify(data, null, 2)}</pre>`;
  resultsDiv.appendChild(section);
}

// calculation po para sa average
function calculateAveragePrice(list) {
  const total = list.reduce((sum, property) => sum + property.price, 0);
  return (total / list.length).toFixed(2);
}

// filter for types
function filterByType(list, type) {
  return list.filter(property => property.type === type);
}

// filter for largest property
function findLargestProperty(list) {
  return list.reduce((largest, property) =>
    property.size > largest.size ? property : largest
  );
}

// for price range
function groupByPriceRange(list) {
  return {
    low: list.filter(p => p.price < 2000000),
    mid: list.filter(p => p.price >= 2000000 && p.price <= 4000000),
    high: list.filter(p => p.price > 4000000)
  };
}

// para sa new listing na dadating as said in the instructions
function fetchNewListings() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        { location: "Iloilo", type: "Condo", price: 2800000, size: 65 },
        { location: "Palawan", type: "House", price: 6000000, size: 150 }
      ]);
    }, 2000);
  });
}

// ---- results po ----
displayResult("Average Price", calculateAveragePrice(properties));
displayResult("Condos", filterByType(properties, "Condo"));
displayResult("Largest Property", findLargestProperty(properties));
displayResult("Grouped by Price Range", groupByPriceRange(properties));


fetchNewListings().then(newListings => {
  displayResult("Fetched New Listings", newListings);
});
