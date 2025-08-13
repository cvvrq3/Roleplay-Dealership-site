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
    const discordId = document.getElementById('discord-id').value;
    const carModel = document.getElementById('car-model').value;

    const response = await fetch('/.netlify/functions/submit_order', {
        method: 'POST',
        body: JSON.stringify({ discordId, carModel }),
        headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
        alert('Заявка отправлена! Администратор свяжется с вами в Discord.');
        closeModal();
    } else {
        alert('Ошибка при отправке заявки.');
    }
});