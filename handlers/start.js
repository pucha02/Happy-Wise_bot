import { startKeyboard } from '../keyboards.js';
import UserInteraction from '../models/UserInteraction.js';

export function startHandler(bot, updateLastInteractionTime) {
  bot.onText(/\/start/, async (msg) => {
    const chatId = msg.chat.id;
    const { first_name, last_name, username, phone } = msg.chat;
  
    // Сохраняем или обновляем данные пользователя в БД
    try {
      await UserInteraction.findOneAndUpdate(
        { chat_id: chatId }, // Уникальный идентификатор чата
        { full_name: `${first_name} ${last_name}`, phone: phone }, // Телефон можно задать позже
        { upsert: true, new: true }
      );
    } catch (error) {
      console.error('Ошибка при сохранении пользователя:', error);
    }
  
    // Обновляем время последнего взаимодействия
    await updateLastInteractionTime(chatId, 'start_command');
  
    await bot.sendMessage(chatId, 'Привіт! Я бот-асистент школи Happy&Wise. Радий допомогти вам на шляху до вивчення англійської мови!');
    await bot.sendMessage(chatId, "Ми розробили спеціальну методику для визначення вашого рівня володіння англійською, щоб підібрати найкращий план навчання для вас. Наступним кроком пропоную пройти невеликий тест, після якого ви зможете залишити свої контакти, і ми зв'яжемося з вами для обговорення результатів та подальших кроків.");
    await bot.sendMessage(chatId, 'Готові розпочати тест?', startKeyboard);
  });
}
