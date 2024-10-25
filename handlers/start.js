import { startKeyboard } from '../keyboards.js';

export function startHandler(bot) {
  bot.onText(/\/start/, async (msg) => {
    const chatId = msg.chat.id;
    await bot.sendMessage(chatId, 'Привіт! Я бот-асистент школи Happy&Wise. Радий допомогти вам на шляху до вивчення англійської мови!');
    await bot.sendMessage(chatId, "Ми розробили спеціальну методику для визначення вашого рівня володіння англійською, щоб підібрати найкращий план навчання для вас.");
    await bot.sendMessage(chatId, 'Готові розпочати тест?', startKeyboard);
  });
}
