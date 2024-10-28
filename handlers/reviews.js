import fs from 'fs';

export function reviewsHandler(bot, updateLastInteractionTime) {
  bot.onText(/Відгуки/, async (msg) => {
    const chatId = msg.chat.id;
    await updateLastInteractionTime(chatId);

    const photos = [
        'images/image.png',
        'images/v2.webp',
        'images/v3.webp',
        'images/v4.webp',
        'images/v5.webp',
        'images/v6.webp',
        'images/v7.webp',
        'images/v8.webp',
        'images/v9.webp'
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
