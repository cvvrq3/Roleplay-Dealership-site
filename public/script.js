async function loadCars() {
  const response = await fetch('/.netlify/functions/cars');
  const cars = await response.json();

  let html = '';
  for (const [id, car] of Object.entries(cars)) {
    html += `
      <div class="car-card">
        <img src="${car.images[0]}" class="car-image">
        <div class="car-info">
          <h3>${car.name}</h3>
          <p>${car.price.toLocaleString()} руб.</p>
          <button 
            class="buy-btn ${car.available ? '' : 'sold-out'}" 
            data-id="${id}"
            ${car.available ? '' : 'disabled'}
          >
            ${car.available ? 'Купить' : 'Продано'}
          </button>
        </div>
      </div>
    `;
  }
  document.getElementById('cars-container').innerHTML = html;
}

loadCars();