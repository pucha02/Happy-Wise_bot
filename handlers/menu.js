import { mainMenu } from '../keyboards.js';

export function mainMenuHandler(bot, updateLastInteractionTime) {
  bot.onText(/Головне меню/, async (msg) => {
    const chatId = msg.chat.id;
    await updateLastInteractionTime(chatId);

    await bot.sendMessage(chatId, 'Обирайте кнопками, що цікавить👇', mainMenu);
  });
}
