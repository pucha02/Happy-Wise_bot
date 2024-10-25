import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Getting __dirname in ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Teacher Photos (relative paths)
export const teacherPhotos = {
  'Ірина Азаренко': path.join(__dirname, 'handlers/images', 'v1.jpg'),
  'Ірина Вергун': path.join(__dirname, 'handlers/images', 'Iryna_Vergun.jpg'),
  'Олег': path.join(__dirname, 'handlers/images', 'Oleg.jpg'),
  'Лоліта': path.join(__dirname, 'handlers/images', 'Lolita.jpg'),
  'Владислава': path.join(__dirname, 'handlers/images', 'Vladyslava.jpg'),
  'Mike': path.join(__dirname, 'handlers/images', 'Mike_Wilson.jpg'),
};

// Teacher Descriptions
export const teacherDescriptions = {
  'Ірина Азаренко': `
🎓 *Засновниця школи "Happy&Wise"*
📚 Викладає у групах та індивідуально
💼 *Business English*
🌍 Проводить онлайн та офлайн *Business Speaking clubs*
🎯 Мотивує студентів щодня на *Розмовних челенджах*
  `,
  'Ірина Вергун': `
👩‍🏫 *Викладачка*
📚 Викладає у групах, парах та індивідуально
👥 Навчає школярів, дорослих та підлітків.
  `,
  'Олег': `
👨‍🏫 *Викладач*
👥 Працює з дорослими індивідуально, в групах та парах
  `,
  'Лоліта': `
👩‍🏫 *Викладачка*
👥 Працює з дорослими та школярами індивідуально, в групах та парах
🎯 Готує до НМТ та ЄВІ
🗣️ Проводить *Speaking clubs*
  `,
  'Владислава': `
👩‍🏫 *Викладачка*
👥 Працює з дорослими та підлітками у групах, парах та індивідуально
🎯 Готує до НМТ та ЄВІ
🗣️ Проводить *Speaking clubs*
  `,
  'Mike': `
🇬🇧 *Native speaker*
👥 Працює у групах та індивідуально зі студентами рівня B1
💼 *Business English*
  `,
};

// Function to send teacher info with photo and description
export function sendTeacherInfo(chatId, teacherName, bot) {
  const photoPath = teacherPhotos[teacherName];
  const description = teacherDescriptions[teacherName];

  if (photoPath && description) {
    try {
      const photoStream = fs.createReadStream(photoPath);
      bot.sendPhoto(chatId, photoStream, {
        caption: description.trim(), // Removes potential leading/trailing whitespace
        parse_mode: 'Markdown',
      });
    } catch (error) {
      console.error(`Error sending photo: ${error.message}`);
      bot.sendMessage(chatId, 'Не вдалося надіслати інформацію про вчителя.');
    }
  } else {
    bot.sendMessage(chatId, 'Вчитель не знайдений.');
  }
}

// Persistent Teachers Keyboard
export const teachersKeyboard = {
  reply_markup: {
    keyboard: [
      [{ text: 'Ірина Азаренко' }],
      [{ text: 'Ірина Вергун' }, { text: 'Олег' }, { text: 'Лоліта' }],
      [{ text: 'Владислава' }, { text: 'Mike' }],
    ],
    resize_keyboard: true,
    one_time_keyboard: false, // Ensures it stays on all screens
  },
};
