import json
import requests

def handler(event, context):
    try:
        data = json.loads(event['body'])
        discord_id = data['discordId']
        car_model = data['carModel']

        # Отправка в Discord через вебхук
        webhook_url = "https://discord.com/api/webhooks/1405214736844460062/YaLq10Y-_DMQ3Ln3HcO7U1EjujBsnzh_F2vx5d6dhO4nazMdALYKaSdbAOrCGZ595gUy"
        message = {
            "content": f"🚗 **Новая заявка на авто!**",
            "embeds": [{
                "title": car_model,
                "description": f"**Discord пользователя:** {discord_id}",
                "color": 0x00ff00
            }]
        }

        requests.post(webhook_url, json=message)
        return {
            'statusCode': 200,
            'body': json.dumps({'message': 'Заявка отправлена!'})
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'error': str(e)})
        }