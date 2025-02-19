import { packageKeyboard } from '../keyboards.js';

export function studyHandler(bot, updateLastInteractionTime) {
  bot.onText(/Навчання/, async (msg) => {
    const chatId = msg.chat.id;
    await updateLastInteractionTime(chatId);
    await bot.sendMessage(
      chatId, 
      `🎉 Вітаємо у блоці "📚 *Навчання*"!
    
Тут Ви можете дізнатися всю необхідну інформацію про наші пакети занять та *придбати їх*.
    
💳 *Після оплати* Ви отримаєте підтвердження на пошту 📧, а наш менеджер зв'яжеться з Вами для подальших інструкцій та відповідей на Ваші питання.
    
✨ Давайте розпочнемо подорож до знань разом!`,
      packageKeyboard
    );
        await bot.sendMessage(chatId, 'Будь ласка, оберіть пакет зі списку👇', packageKeyboard);
  });
}
