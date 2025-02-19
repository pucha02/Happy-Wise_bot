import fs from 'fs'; // Используем для чтения файла

export function sendOferta(bot) {
  bot.onText(/Договір оферти/, async (msg) => {
    const chatId = msg.chat.id;

    const filePath = './public_offer.pdf';

    await bot.sendDocument(chatId, fs.createReadStream(filePath));
  });
}