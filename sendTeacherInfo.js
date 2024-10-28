import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Для получения __dirname в ES-модулях
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Загрузка фото учителей с использованием относительных путей
const teacherPhotos = {
  'Ірина Азаренко': path.join(__dirname, 'images', 'Irina_Azarenro.jpg'),
  'Ірина Вергун': path.join(__dirname, 'images', 'Iryna_Vergun.jpg'),
  'Олег': path.join(__dirname, 'images', 'Oleg.jpg'),
  'Лоліта': path.join(__dirname, 'images', 'Lolita.jpg'),
  'Владислава': path.join(__dirname, 'images', 'Vladyslava.jpg'),
  'Mike': path.join(__dirname, 'images', 'Mike_Wilson.jpg'),
};

// Описание учителей
export const teacherDescriptions = {
  'Ірина Азаренко': `
  🎓 <b>Засновниця школи "Happy&Wise"</b>\n
  📚 Викладає у групах та індивідуально\n
  💼 <b>Business English</b>\n
  🌍 Проводить онлайн та офлайн <b>Business Speaking clubs</b>\n
  🎯 Мотивує студентів щодня на <b>Розмовних челенджах</b>
  `,
  'Ірина Вергун': `
  👩‍🏫 <b>Викладачка</b>\n
  👥 Працює з дорослими та школярами індивідуально, в групах та парах\n
  🎯 Готує до НМТ та ЄВІ\n
  🗣️ Проводить <b>Speaking clubs</b>
  `,
  'Олег': `
  👨‍🏫 <b>Викладач</b>\n
  👥 Працює з дорослими індивідуально, в групах та парах
  `,
  'Лоліта': `
  👩‍🏫 <b>Викладачка</b>\n
  👥 Працює з дорослими та школярами індивідуально, в групах та парах\n
  🎯 Готує до НМТ та ЄВІ\n
  🗣️ Проводить <b>Speaking clubs</b>
  `,
  'Владислава': `
  👩‍🏫 <b>Викладачка</b>\n
  👥 Працює з дорослими та підлітками у групах, парах та індивідуально\n
  🎯 Готує до НМТ та ЄВІ\n
  🗣️ Проводить <b>Speaking clubs</b>
  `,
  'Mike': `
  🇬🇧 <b>Native speaker</b>\n
  👥 Працює у групах та індивідуально зі студентами рівня B1\n
  💼 <b>Business English</b>
  `,
};

// Функция для отправки фото и описания учителя
export function sendTeacherInfo(chatId, teacherName, bot) {
  const photoPath = teacherPhotos[teacherName];
  const description = teacherDescriptions[teacherName];

  if (photoPath && description) {
    const photoStream = fs.createReadStream(photoPath);
    bot.sendPhoto(chatId, photoStream, {
      caption: description,
      parse_mode: 'HTML',  // Меняем Markdown на HTML для совместимости с тегами <b>
    });
  } else {
    bot.sendMessage(chatId, 'Вчитель не знайдений.');
  }
}


