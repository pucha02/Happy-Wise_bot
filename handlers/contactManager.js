import { sendToKeyCRM } from '../sendToKeyCRM.js';

export function contactManagerHandler(bot, updateLastInteractionTime, levelStats) {
  const awaitingContactInfo = {};

  bot.onText(/Зв'язатися із менеджером/, async (msg) => {
    const chatId = msg.chat.id;
    awaitingContactInfo[chatId] = true;  // Устанавливаем флаг для ожидания данных
    await bot.sendMessage(chatId, "Будь ласка, надішліть ваше ім'я та контактний номер телефону у форматі: Ім'я, Телефон.");
    await updateLastInteractionTime(chatId);
  });

  bot.on('message', async (msg) => {
    const chatId = msg.chat.id;

    // Проверяем, ожидает ли бот контактную информацию от пользователя
    if (awaitingContactInfo[chatId]) {
      const contactInfo = msg.text.split(',');

      if (contactInfo.length < 2) {
        await bot.sendMessage(chatId, "Будь ласка, введіть дані у форматі: Ім'я, Телефон.");
      } else {
        const fullName = contactInfo[0].trim();
        const phone = contactInfo[1].trim();
        const contactData = { full_name: fullName + levelStats, phone: phone, chatId: chatId };

        // Подтверждаем получение данных и очищаем флаг
        await bot.sendMessage(chatId, `Дякую! Ми зв'яжемося з вами за наступним номером: ${phone}`);
        awaitingContactInfo[chatId] = false;  // Убираем флаг ожидания

        // Отправляем данные в CRM или другой нужный сервис
        sendToKeyCRM(contactData);
      }
      await updateLastInteractionTime(chatId);
    }
  });
}

