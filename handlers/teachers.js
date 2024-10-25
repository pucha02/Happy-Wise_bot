import { teachersKeyboard } from '../keyboards.js';
import { sendTeacherInfo, teacherDescriptions } from '../sendTeacherInfo.js';

export function teachersHandler(bot) {
  bot.onText(/Наші вчителі/, async (msg) => {
    const chatId = msg.chat.id;
    await bot.sendMessage(chatId, 'Будь ласка, оберіть викладача зі списку👇', teachersKeyboard);
  });

  bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const teacherName = msg.text.trim();
    if (teacherDescriptions[teacherName]) {
      sendTeacherInfo(chatId, teacherName, bot);
    }
  });
}
