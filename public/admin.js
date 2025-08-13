async function loadCars() {
  const response = await fetch('/.netlify/functions/cars');
  const cars = await response.json();

  const carsList = document.getElementById('cars-list');
  carsList.innerHTML = '';

  for (const [id, car] of Object.entries(cars)) {
    const carItem = document.createElement('div');
    carItem.className = 'car-item';
    carItem.innerHTML = `
      <span>${car.name} (${car.price} руб.)</span>
      <button class="toggle-btn" data-id="${id}">
        ${car.available ? '✅ В продаже' : '❌ Продано'}
      </button>
    `;
    carsList.appendChild(carItem);
  }

  // Вешаем обработчики на кнопки
  document.querySelectorAll('.toggle-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const carId = btn.dataset.id;
      const response = await fetch('/.netlify/functions/cars', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'toggle', carId })
      });
      
      if (response.ok) {
        loadCars(); // Перезагружаем список
      }
    });
  });
}

// Загружаем данные при открытии страницы
loadCars();