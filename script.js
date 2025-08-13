function showForm(carName, price) {
    document.getElementById('car-name').textContent = carName;
    document.getElementById('car-model').value = carName;
    document.getElementById('modal').style.display = 'block';
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

document.getElementById('order-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const response = await fetch('/.netlify/functions/submit_order', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      discordId: document.getElementById('discord-id').value,
      carModel: document.getElementById('car-model').value
    })
  });

  const result = await response.json();
  alert(result.message || result.error);
  closeModal();
});
