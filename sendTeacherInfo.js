// Використовуємо імпорт замість require
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Якщо використовуємо імпорт у файлі .mjs, для отримання __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ініціалізація бота

// Зображення вчителів (використовуємо відносні шляхи)
const teacherPhotos = {
  Ірина: path.join(__dirname, 'images', 'Iryna_Vergun.jpg'),
  Олег: path.join(__dirname, 'images', 'Oleg.jpg'),
  Лоліта: path.join(__dirname, 'images', 'Lolita.jpg'),
  Владислава: path.join(__dirname, 'images', 'Vladyslava.jpg'),
  Mike: path.join(__dirname, 'images', 'Mike_Wilson.jpg'),
};

// Опис вчителів
export const teacherDescriptions = {
  Ірина: `
  🎓 *Засновниця школи "Happy&Wise"*\n
  📚 Викладає у групах та індивідуально\n
  💼 *Business English*\n
  🌍 Проводить онлайн та офлайн *Business Speaking clubs*\n
  🎯 Мотивує студентів щодня на *Розмовних челенджах*
  `,
  Олег: `
  👨‍🏫 *Викладач*\n
  👥 Працює з дорослими індивідуально, в групах та парах
  `,
  Лоліта: `
  👩‍🏫 *Викладачка*\n
  👥 Працює з дорослими та школярами індивідуально, в групах та парах\n
  🎯 Готує до НМТ та ЄВІ\n
  🗣️ Проводить *Speaking clubs*
  `,
  Владислава: `
  👩‍🏫 *Викладачка*\n
  👥 Працює з дорослими та підлітками у групах, парах та індивідуально\n
  🎯 Готує до НМТ та ЄВІ\n
  🗣️ Проводить *Speaking clubs*
  `,
  Mike: `
  🇬🇧 *Native speaker*\n
  👥 Працює у групах та індивідуально зі студентами рівня B1\n
  💼 *Business English*
  `,
};

// Функція для відправки фото та опису вчителя
export function sendTeacherInfo(chatId, teacherName, bot) {
  const photoPath = teacherPhotos[teacherName];
  const description = teacherDescriptions[teacherName];

  if (photoPath && description) {
    // Використовуємо fs.createReadStream для відправки локального фото
    const photoStream = fs.createReadStream(photoPath);
    bot.sendPhoto(chatId, photoStream, {
      caption: description,
      parse_mode: 'Markdown',
    });
  } else {
    bot.sendMessage(chatId, 'Вчитель не знайдений.');
  }
}


// Клавіатура викладачів
export const teachersKeyboard = {
  reply_markup: {
    keyboard: [
      [{ text: 'Ірина' }, { text: 'Олег' }, { text: 'Лоліта' }],
      [{ text: 'Владислава' }, { text: 'Mike' }],
    ],
    resize_keyboard: true,
  },
};
