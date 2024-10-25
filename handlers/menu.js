import { mainMenu } from '../keyboards.js';

export function mainMenuHandler(bot) {
  bot.onText(/Головне меню/, async (msg) => {
    const chatId = msg.chat.id;
    await bot.sendMessage(chatId, 'Обирайте кнопками, що цікавить👇', mainMenu);
  });
}
