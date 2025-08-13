exports.handler = async (event) => {
  try {
    const data = JSON.parse(event.body);
    
    // Ваш Discord Webhook URL
    const webhookURL = "https://discord.com/api/webhooks/ВАШ_ВЕБХУК";
    
    const discordMessage = {
      embeds: [{
        title: "🚗 Новая заявка на авто",
        fields: [
          { name: "Discord пользователя", value: data.discordId },
          { name: "Автомобиль", value: data.carModel }
        ],
        color: 0x00FF00
      }]
    };

    await fetch(webhookURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(discordMessage)
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Заявка отправлена!" })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Ошибка сервера" })
    };
  }
};
