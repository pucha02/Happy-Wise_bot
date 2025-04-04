import TelegramBot from 'node-telegram-bot-api';
import fs from 'fs'
import path from 'path';
import { mainMenu, startKeyboard, testMenuKeyboard, aboutSchoolMenu, teachersKeyboard, packageKeyboard } from './keyboards.js';
import { teacherDescriptions, sendTeacherInfo } from './sendTeacherInfo.js';
import { sendToKeyCRM } from './sendToKeyCRM.js';
import { sendQuestion } from './sendQuestion.js';
import { setBotCommands } from './setBotCommands.js';
import { questions } from './questionsForTEst.js';

const token = '8093162300:AAERaFyiqaWZn_mkAwtyYtd9epPHNvSFX0s';
const bot = new TelegramBot(token, { polling: true });

setBotCommands(bot);

let currentQuestion = {};
let isTakingTest = {};
let countTrueAnswers = {};

////////////////////// Старт
bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;

  await bot.sendMessage(chatId, 'Привіт! Я бот-асистент школи Happy&Wise. Радий допомогти вам на шляху до вивчення англійської мови!');
  await bot.sendMessage(chatId, "Ми розробили спеціальну методику для визначення вашого рівня володіння англійською, щоб підібрати найкращий план навчання для вас. Наступним кроком пропоную пройти невеликий тест, після якого ви зможете залишити свої контакти, і ми зв'яжемося з вами для обговорення результатів та подальших кроків.");
  await bot.sendMessage(chatId, 'Готові розпочати тест?', startKeyboard);
});
////////////////////// Старт


////////////////////// Головне меню
bot.onText(/Головне меню/, async (msg) => {
  const chatId = msg.chat.id;
  await bot.sendMessage(chatId, 'Обирайте кнопками, що цікавить👇', mainMenu);
});
////////////////////// Головне меню

////////////////////// Про школу
bot.onText(/Про школу/, async (msg) => {
  const chatId = msg.chat.id;
  await bot.sendMessage(
    chatId, 
    `🏫 <b>Happy&Wise</b> — це спільнота щасливих та мудрих людей, які об'єднані спільною місією — створити в Україні англомовне суспільство.\n\n🎯 Наша єдина ціль — прокачати вашу <b>РОЗМОВНУ Англійську</b>!`,
    {
      parse_mode: 'HTML',
      reply_markup: aboutSchoolMenu
    }
  );
});

////////////////////// Про школу

////////////////////// Формати навчання
bot.onText(/Формати навчання/, async (msg) => {
  const chatId = msg.chat.id;
  await bot.sendMessage(
    chatId, 
    `🎓 <b>Англійська як спосіб життя</b>\n\n🌟 <b>Розмовна англійська — наш пріоритет!</b> Практика розмов у різних форматах:\n
    - 👥 <b>Групові / парні / індивідуальні заняття</b> на навчальній платформі з викладачем\n
    - 🌍 <b>Заняття з носіями мови</b>\n
    - 🗣️ <b>Speaking Club</b> — щосуботи о 10:00\n
    - 💬 <b>Розмовні челенджі</b> — щомісяця`,
    { parse_mode: 'HTML' }  // Указываем, что используем HTML
  );
});
////////////////////// Формати навчання

////////////////////// Переваги навчання з нами
bot.onText(/Переваги навчання з нами/, async (msg) => {
  const chatId = msg.chat.id;
  await bot.sendMessage(
    chatId, 
    `🌟 **Фокус на розмовній англійській**\n
    Наша платформа створена, щоб тебе розговорити. Але й граматика буде обов'язково, без неї неможливо грамотно говорити.\n

    🧠 **Мудрі у своєму підході до навчання**\n
    Знаємо, що потрібно пропрацювати, щоб ви заговорили і не боялися проявлятися англійською.\n

    😊 **Щасливі, коли наші студенти починають говорити**\n
    90% заняття ТИ будеш говорити.\n

    💻 **Навчаємось на платформі**\n
    Навчайся з будь-якого гаджету. Матеріал структурований та інтерактивний. Використовуємо метод перевернутого уроку: студенти ДО заняття вчать слова, а не після; це дає змогу попрактикувати з викладачем потрібну лексику одразу на занятті.\n

    🌈 **Безпечний простір, де можна помилятися**\n
    Помилятись — це ОК. Щоб розговоритися, потрібно виговорювати помилки, щоразу покращуючи свій рівень.\n

    ⏳ **Знаємо, як знайти час на англійську**\n
    Поділимось секретами ефективного планування часу. Повір, рівень щастя в твоєму житті точно зросте!`
  );
});
////////////////////// Переваги навчання з нами

////////////////////// Часті запитання
bot.onText(/Часті запитання/, async (msg) => {
  const chatId = msg.chat.id;
  await bot.sendMessage(
    chatId, 
    `❓ **Який формат краще: групові, парні чи індивідуальні?**\n
    Все залежить від твоєї цілі: якщо хочеш більше говорити — обирай групові або парні заняття. Якщо маєш спецзапит та обмежений час для вивчення — обирай індивідуальний формат.\n\n

    👥 **Як відбуваються групові заняття?**\n
    Заняття триватиме 55 хв у міні-групі до 5-6 студентів з однаковим рівнем володіння мовою, щоб всім було комфортно. На заняттях ви будете пропрацьовувати всі аспекти мовлення: граматику, лексику, говоріння, навички сприйняття на слух і письмо. Але найбільше ви будете говорити! Ми дбаємо, щоб ви отримали результат якісно і назавжди.\n\n

    ❌ **Як я можу скасувати підписку?**\n
    Наш адміністратор допоможе призупинити або скасувати підписку у разі потреби.`
  );
});
////////////////////// Часті запитання

////////////////////// Відгуки
bot.onText(/Відгуки/, async (msg) => {
  const chatId = msg.chat.id;

  const photos = [
    'images/image.png',
    'images/v2.webp',
    'images/v3.webp',
    'images/v4.webp',
    'images/v5.webp',
    'images/v6.webp',
    'images/v7.webp',
    'images/v8.webp',
    'images/v9.webp'
  ];

  for (const photo of photos) {
    if (!fs.existsSync(photo)) {
      console.error(`Файл не найден: ${photo}`);
      continue;
    }

    const photoStream = fs.createReadStream(photo);
    try {
      await bot.sendPhoto(chatId, photoStream);
    } catch (error) {
      console.error('Ошибка при отправке фото:', error);
    }
  }
  await bot.sendMessage(chatId, 'Більше відгуків ви зможете знайти на нашому сайті - https://happyandwise.wayforpay.shop/');

});
////////////////////// Відгуки

////////////////////// Вчителі
// Обробник для показу списку вчителів
bot.onText(/Наші вчителі/, async (msg) => {
  const chatId = msg.chat.id;

  // Відправляємо клавіатуру з вибором вчителів
  await bot.sendMessage(chatId, 'Будь ласка, оберіть викладача зі списку👇', teachersKeyboard);
});

// Обробник для відстеження вибору вчителя
bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const teacherName = msg.text.trim(); // Очищуємо текст від зайвих пробілів

  // Якщо ім'я вчителя є в списку, відправляємо фото і опис
  if (teacherDescriptions[teacherName]) {
    sendTeacherInfo(chatId, teacherName, bot);
  }
});
////////////////////// Вчителі

////////////////////// Навчання
bot.onText(/Навчання/, async (msg) => {
  const chatId = msg.chat.id;

  // Відправляємо клавіатуру з вибором вчителів
  await bot.sendMessage(chatId, 'Будь ласка, оберіть пакет зі списку👇', packageKeyboard);
});
////////////////////// Навчання

////////////////////// TECT
bot.onText(/Перевірити свій рівень/, async (msg) => {
  const chatId = msg.chat.id;

  await bot.sendMessage(chatId, 'Обирайте кнопками, що цікавить👇', testMenuKeyboard);
});

bot.onText(/Почати тест/, async (msg) => {
  const chatId = msg.chat.id;
  isTakingTest[chatId] = true;
  currentQuestion[chatId] = 0;
  countTrueAnswers[chatId] = 0;

  await bot.sendMessage(chatId, 'Починаємо тест з англійської! Для виходу з тесту натисніть кнопку "Вийти з тесту".');
  sendQuestion(chatId, questions, currentQuestion, bot);
});

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;

  if (msg.text === 'Вийти з тесту') {
    isTakingTest[chatId] = false;
    await bot.sendMessage(chatId, 'Ви успішно вийшли з тесту.', testMenuKeyboard);
    return;
  }

  if (isTakingTest[chatId]) {
    const questionData = questions[currentQuestion[chatId]];

    if (msg.text === questionData.answer) {
      currentQuestion[chatId]++;
      countTrueAnswers[chatId]++
    } else {
      currentQuestion[chatId]++;
    }

    if (currentQuestion[chatId] < questions.length) {
      sendQuestion(chatId, questions, currentQuestion, bot);
    } else {
      await bot.sendMessage(chatId, `Тест завершено! Кількість правильних відповідей ${Object.values(countTrueAnswers)}. Дякую за участь!`, testMenuKeyboard);
      isTakingTest[chatId] = false;
    }
  }
});
////////////////////// TECT

bot.onText(/Запис на безкоштовне пробне/, (msg) => {
  bot.sendMessage(msg.chat.id, "Будь ласка, надішліть ваше ім'я та контактний номер телефону.");

  bot.once('message', (contactMsg) => {
    const contactInfo = contactMsg.text.split(',');

    if (contactInfo.length < 2) {
      bot.sendMessage(contactMsg.chat.id, "Будь ласка, введіть дані у форматі: Ім'я, Телефон.");
      return;
    }

    const fullName = contactInfo[0].trim();
    const phone = contactInfo[1].trim();

    const contactData = {
      full_name: fullName,
      phone: phone,
    };

    bot.sendMessage(contactMsg.chat.id, `Дякую! Ми зв'яжемося з вами за наступним номером: ${phone}`);

    sendToKeyCRM(contactData);
  });
});
