import fs from 'fs'; // Используем для чтения файла

export function sendBonus(bot) {
  bot.onText(/🎁 Бонус/, async (msg) => {
    const chatId = msg.chat.id;

    const bonusText = 'Приємний бонус для Вас! 🎉';

    const filePath = './bonus.pdf';

    await bot.sendMessage(chatId, bonusText);

    await bot.sendDocument(chatId, fs.createReadStream(filePath), {
      caption: 'Скачайте свій бонусний файл 📄',
    });
  });
}