import { aboutSchoolMenu } from '../keyboards.js';

export function schoolInfoHandler(bot, updateLastInteractionTime) {
  bot.onText(/Про школу/, async (msg) => {
    const chatId = msg.chat.id;
    await updateLastInteractionTime(chatId);

    await bot.sendMessage(
      chatId, 
      `🏫 <b>Happy&Wise</b> — це спільнота щасливих та мудрих людей, які об'єднані спільною місією — створити в Україні англомовне суспільство.\n\n🎯 Наша єдина ціль — прокачати вашу <b>РОЗМОВНУ Англійську</b>!`,
      {
        parse_mode: 'HTML',
        reply_markup: aboutSchoolMenu
      }
    );
  });
}
