exports.handler = async (event) => {
  const { carId, discordId } = JSON.parse(event.body);
  const webhookURL = "https://discord.com/api/webhooks/1405214742456569856/eZov8-B4CwUGjH3l998Raeh2SZ7uSnQ_NyrelqHymqFTplF27UNQ0zQwh9tHW4RHBLOj";
  
  await fetch(webhookURL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      content: `🎟️ **Новый заказ!**\nПокупатель: ${discordId}\nАвто: ${carId}`
    })
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ success: true })
  };
};