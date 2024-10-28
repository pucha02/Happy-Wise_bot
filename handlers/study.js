import { packageKeyboard } from '../keyboards.js';

export function studyHandler(bot, updateLastInteractionTime) {
  bot.onText(/Навчання/, async (msg) => {
    const chatId = msg.chat.id;
    await updateLastInteractionTime(chatId);
    await bot.sendMessage(chatId, 'Будь ласка, оберіть пакет зі списку👇', packageKeyboard);
  });
}
