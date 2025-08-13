const fs = require('fs');
const path = require('path');

// Путь к файлу с данными
const carsPath = path.join(__dirname, '../../public/cars.json');

exports.handler = async (event) => {
  // Читаем текущие данные
  const carsData = JSON.parse(fs.readFileSync(carsPath, 'utf-8'));

  if (event.httpMethod === "GET") {
    return {
      statusCode: 200,
      body: JSON.stringify(carsData)
    };
  }

  if (event.httpMethod === "POST") {
    const { action, carId } = JSON.parse(event.body);
    
    if (action === "toggle") {
      // Меняем статус
      carsData[carId].available = !carsData[carId].available;
      
      // Сохраняем изменения
      fs.writeFileSync(carsPath, JSON.stringify(carsData, null, 2));
      
      return {
        statusCode: 200,
        body: JSON.stringify({ success: true })
      };
    }
  }

  return {
    statusCode: 400,
    body: JSON.stringify({ error: "Неверный запрос" })
  };
};