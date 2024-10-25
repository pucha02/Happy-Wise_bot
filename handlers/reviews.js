import fs from 'fs';

export function reviewsHandler(bot) {
  bot.onText(/Відгуки/, async (msg) => {
    const chatId = msg.chat.id;
    const photos = [
        'handlers/images/image.png',
        'handlers/images/v2.webp',
        'handlers/images/v3.webp',
        'handlers/images/v4.webp',
        'handlers/images/v5.webp',
        'handlers/images/v6.webp',
        'handlers/images/v7.webp',
        'handlers/images/v8.webp',
        'handlers/images/v9.webp'
      ];

    for (const photo of photos) {
      if (!fs.existsSync(photo)) {
        console.error(`Файл не найден: ${photo}`);
        continue;
      }
      const photoStream = fs.createReadStream(photo);
      try {
        await bot.sendPhoto(chatId, photoStream);
      } catch (error) {
        console.error('Ошибка при отправке фото:', error);
      }
    }
    await bot.sendMessage(chatId, 'Більше відгуків ви зможете знайти на нашому сайті - https://happyandwise.wayforpay.shop/');
  });
}
