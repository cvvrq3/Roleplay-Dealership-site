exports.handler = async (event) => {
  try {
    const data = JSON.parse(event.body);
    
    const webhookURL = "https://discord.com/api/webhooks/1405214742456569856/eZov8-B4CwUGjH3l998Raeh2SZ7uSnQ_NyrelqHymqFTplF27UNQ0zQwh9tHW4RHBLOj";
    
    const discordMessage = {
      embeds: [{
        title: "Новая заявка на авто",
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


