import { sendToKeyCRM } from '../sendToKeyCRM.js';

export function contactManagerHandler(bot) {
  bot.onText(/Зв'язатися із менеджером/, (msg) => {
    bot.sendMessage(msg.chat.id, "Будь ласка, надішліть ваше ім'я та контактний номер телефону.");

    bot.once('message', (contactMsg) => {
      const contactInfo = contactMsg.text.split(',');
      if (contactInfo.length < 2) {
        bot.sendMessage(contactMsg.chat.id, "Будь ласка, введіть дані у форматі: Ім'я, Телефон.");
        return;
      }
      const fullName = contactInfo[0].trim();
      const phone = contactInfo[1].trim();
      const contactData = { full_name: fullName, phone: phone };
      bot.sendMessage(contactMsg.chat.id, `Дякую! Ми зв'яжемося з вами за наступним номером: ${phone}`);
      sendToKeyCRM(contactData);
    });
  });
}
